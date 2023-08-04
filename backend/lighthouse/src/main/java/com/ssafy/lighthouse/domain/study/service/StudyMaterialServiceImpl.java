package com.ssafy.lighthouse.domain.study.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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
	public Long createMaterial(final StudyMaterialDto.Req dto, final MultipartFile file) {
		StudyMaterial entity = dto.toEntity();
		if (!file.isEmpty()) {
			String fileUrl = s3Utils.uploadFile(CATEGORY, file);
			entity.setFileUrl(fileUrl);
		}
		studyMaterialRepository.save(entity);
		return entity.getId();
	}

	@Override
	public Long updateMaterialFromId(final Long id, final StudyMaterialDto.Req dto, final MultipartFile file) {
		StudyMaterial targetStudyMaterial = findById(id);
		return updateMaterial(targetStudyMaterial, dto, file);
	}

	@Override
	public Long updateMaterial(final StudyMaterial targetStudyMaterial, final StudyMaterialDto.Req dto,
		final MultipartFile file) {
		if (!file.isEmpty()) {
			//이전 파일 삭제
			s3Utils.deleteFile(targetStudyMaterial.getFileUrl());
			String fileUrl = s3Utils.uploadFile(CATEGORY, file);
			targetStudyMaterial.updateWithFile(dto.getStudyId(), dto.getSessionId(), dto.getType(),
				dto.getContent(), fileUrl);
			return dto.getStudyId();
		}
		targetStudyMaterial.updateWithoutFile(dto.getStudyId(), dto.getSessionId(), dto.getType(), dto.getContent());
		return dto.getStudyId();
	}

	@Override
	public Long removeMaterial(final Long id) {
		StudyMaterial studyMaterial = findById(id);
		s3Utils.deleteFile(studyMaterial.getFileUrl());
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
