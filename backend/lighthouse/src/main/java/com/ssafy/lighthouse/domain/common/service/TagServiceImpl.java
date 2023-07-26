package com.ssafy.lighthouse.domain.common.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.lighthouse.domain.common.dto.TagDto;
import com.ssafy.lighthouse.domain.common.entity.Tag;
import com.ssafy.lighthouse.domain.common.repository.TagRepository;

@Service
public class TagServiceImpl implements TagService {
	private final TagRepository tagRepository;

	@Autowired
	public TagServiceImpl(TagRepository tagRepository) {
		this.tagRepository = tagRepository;
	}

	@Override
	public List<TagDto> getAllTag() {
		List<Tag> allTag = tagRepository.findAll();

		// EntityList to DtoList
		return allTag.stream()
			.map(TagDto::new)
			.collect(Collectors.toList());
	}

}
