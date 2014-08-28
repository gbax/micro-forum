package com.gbax.TopicsTestTask.controller;

import com.gbax.TopicsTestTask.dao.entity.Topic;
import com.gbax.TopicsTestTask.enums.Errors;
import com.gbax.TopicsTestTask.service.TopicService;
import com.gbax.TopicsTestTask.system.exception.EntityNotFoundException;
import com.gbax.TopicsTestTask.system.exception.NotAuthorizedException;
import com.gbax.TopicsTestTask.system.security.SecurityService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.Writer;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

/**
 * Created by abayanov
 * Date: 18.08.14
 */
@Controller
@RequestMapping("/topics")
public class TopicController {

    final Logger logger = LoggerFactory.getLogger(TopicController.class);

    @Autowired
    TopicService topicService;

    @Autowired
    HttpServletRequest request;

    @Autowired
    SecurityService securityService;

    @ExceptionHandler(EntityNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public void handleEntityNotFoundException(final EntityNotFoundException e, final HttpServletRequest request,
                                 Writer writer) throws IOException {
        writer.write(String.format(
                "{\"error\":{\"java.class\":\"%s\", \"error\":\"%s\"}}",
                e.getClass(), e.getError().getId()));
    }

    @ExceptionHandler(NotAuthorizedException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public void handleNotAuthorizedException(final NotAuthorizedException e, final HttpServletRequest request,
                                             Writer writer) throws IOException {
        writer.write(String.format(
                "{\"error\":{\"java.class\":\"%s\", \"error\":\"%s\"}}",
                e.getClass(), e.getError().getId()));
    }

    @RequestMapping(method = RequestMethod.GET, produces = "text/plain")
    @ResponseBody
    public String topics() {
        Integer perPage = Integer.parseInt(request.getParameter("per_page"));
        Integer page = Integer.parseInt(request.getParameter("page"));
        String order = request.getParameter("order");
        String sort = request.getParameter("sort");
        return topicService.getTopicsJSON(perPage, page, order, sort);
    }

    @RequestMapping(method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public Topic create(@RequestBody Topic topic) throws IOException, NotAuthorizedException {
        if (securityService.getSecurityPrincipal() == null) {
            throw new NotAuthorizedException(Errors.NOT_AUTHORIZED);
        }
        return topicService.addTopic(topic);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void remove(@PathVariable("id") Integer id) throws EntityNotFoundException, NotAuthorizedException {
        if (securityService.getSecurityPrincipal() == null) {
            throw new NotAuthorizedException(Errors.NOT_AUTHORIZED);
        }
        topicService.remove(id);
    }
}
