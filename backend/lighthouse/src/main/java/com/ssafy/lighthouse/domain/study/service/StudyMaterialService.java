package com.ssafy.lighthouse.domain.study.service;

import java.util.List;

import com.ssafy.lighthouse.domain.study.dto.StudyMaterialDto;
import com.ssafy.lighthouse.domain.study.entity.StudyMaterial;

public interface StudyMaterialService {
	List<StudyMaterial> findAllByStudyId(int studyId);
	int createMaterial(StudyMaterialDto.StudyMaterialReq dto);
	int updateMaterial(int id, StudyMaterialDto.StudyMaterialReq dto);
	int removeMaterial(int id);
	StudyMaterial findById(int id);
}
