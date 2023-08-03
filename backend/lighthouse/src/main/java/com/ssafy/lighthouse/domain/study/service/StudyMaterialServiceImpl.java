package com.ssafy.lighthouse.domain.study.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.lighthouse.domain.common.util.S3Utils;
import com.ssafy.lighthouse.domain.study.dto.StudyMaterialDto;
import com.ssafy.lighthouse.domain.study.entity.StudyMaterial;
import com.ssafy.lighthouse.domain.study.exception.StudyMaterialNotFoundException;
import com.ssafy.lighthouse.domain.study.repository.StudyMaterialRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
@Transactional
public class StudyMaterialServiceImpl implements StudyMaterialService {
	private static final String CATEGORY = "studymaterials";
	private StudyMaterialRepository studyMaterialRepository;
	private S3Utils s3Utils;

	@Override
	public List<StudyMaterial> findAllByStudyId(Long studyId) {
		return studyMaterialRepository.findByStudyId(studyId);
	}

	@Override
	public Long createMaterial(final StudyMaterialDto.Req dto) {
		StudyMaterial entity = dto.toEntity();
		String fileUrl = s3Utils.uploadFile(CATEGORY, dto.getFile());

		studyMaterialRepository.save(entity);
		return entity.getId();
	}

	@Override
	public Long updateMaterial(final Long id, final StudyMaterialDto.Req dto) {
		StudyMaterial studyMaterial = findById(id);
		studyMaterial.update(dto.getStudyId(), dto.getSessionId(), dto.getType(), dto.getContent(), dto.getFileUrl());
		return id;
	}

	@Override
	public Long removeMaterial(final Long id) {
		StudyMaterial studyMaterial = findById(id);
		studyMaterial.remove();
		return id;
	}

	@Override
	public StudyMaterial findById(final Long id) {
		final Optional<StudyMaterial> studyMaterial = studyMaterialRepository.findById(id);
		studyMaterial.orElseThrow(() -> new StudyMaterialNotFoundException(id));
		return studyMaterial.get();
	}
}
