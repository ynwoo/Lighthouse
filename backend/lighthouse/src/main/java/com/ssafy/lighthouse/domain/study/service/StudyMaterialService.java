package com.ssafy.lighthouse.domain.study.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.ssafy.lighthouse.domain.study.dto.StudyMaterialDto;
import com.ssafy.lighthouse.domain.study.entity.StudyMaterial;

public interface StudyMaterialService {
	List<StudyMaterial> findAllByStudyId(Long studyId);
	Long createMaterial(StudyMaterialDto.Req dto, MultipartFile file);

	Long updateMaterialFromId(Long id, StudyMaterialDto.Req dto, MultipartFile file);

	Long updateMaterial(StudyMaterial targetStudyMaterial, StudyMaterialDto.Req dto,
		MultipartFile file);
	Long removeMaterial(Long id);
	StudyMaterial findById(Long id);
}
