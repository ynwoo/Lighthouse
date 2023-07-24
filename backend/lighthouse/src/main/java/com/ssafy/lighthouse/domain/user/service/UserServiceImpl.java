package com.ssafy.lighthouse.domain.user.service;


import com.ssafy.lighthouse.domain.user.repository.UserTagRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.lighthouse.domain.user.dto.UserMyPageDto;
import com.ssafy.lighthouse.domain.user.entity.User;
import com.ssafy.lighthouse.domain.user.exception.UserNotFoundException;
import com.ssafy.lighthouse.domain.user.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private UserTagRepository userTagRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, UserTagRepository userTagRepository) {
        this.userRepository = userRepository;
        this.userTagRepository = userTagRepository;
    }

    @Override
    public UserMyPageDto getMyPageUser(Integer userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFoundException(userId.toString())
        );
        return this.entityToDto(user);
    }

    @Override
    public List<String> getKeywordsByUserId(Integer userId) {
        List<String> tags = userTagRepository.findDistinctTagByUserIdAndIsValidTrue(userId);
        return tags;
    }
}
