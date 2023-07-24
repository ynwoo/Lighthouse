package com.ssafy.lighthouse.domain.study.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.lighthouse.domain.study.dto.StudyMaterialDto;
import com.ssafy.lighthouse.domain.study.entity.StudyMaterial;
import com.ssafy.lighthouse.domain.study.exception.StudyMaterialNotFoundException;
import com.ssafy.lighthouse.domain.study.repository.StudyMaterialRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
@Transactional
public class StudyMaterialServiceImpl implements StudyMaterialService {
	private StudyMaterialRepository studyMaterialRepository;

	@Override
	public List<StudyMaterial> findAllByStudyId(int studyId) {
		return studyMaterialRepository.findByStudyId(studyId);
	}

	@Override
	public int createMaterial(final StudyMaterialDto.StudyMaterialReq dto) {
		StudyMaterial entity = studyMaterialRepository.save(dto.toEntity());
		return entity.getId();
	}

	@Override
	public int updateMaterial(final int id, final StudyMaterialDto.StudyMaterialReq dto) {
		StudyMaterial studyMaterial = findById(id);
		studyMaterial.update(dto.getStudyId(), dto.getType(), dto.getContent(), dto.getFileUrl());
		return id;
	}

	@Override
	public int removeMaterial(final int id) {
		StudyMaterial studyMaterial = findById(id);
		studyMaterial.remove();
		return id;
	}

	@Override
	public StudyMaterial findById(final int id) {
		final Optional<StudyMaterial> studyMaterial = studyMaterialRepository.findById(id);
		studyMaterial.orElseThrow(() -> new StudyMaterialNotFoundException(id));
		return studyMaterial.get();
	}
}
