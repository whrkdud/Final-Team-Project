package com.project.jeogi.controller;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RestController;

import com.project.jeogi.dao.JeogiDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestParam;


@RestController
@CrossOrigin(origins="*")
public class travelController {
    @Autowired
    JeogiDao jeogiDao;

    @PostMapping("/travelData")
    public List<Map<String,Object>> travel(
        @RequestBody Map<String,Object> sigid
    ) {
        String signum = (String) sigid.get("sigid");
        return jeogiDao.selectTourPlace(signum);
    }

    @PostMapping("/festivalData")
    public List<Map<String,Object>> festival(
        @RequestBody Map<String,Object> sigid
    ) {
        String signum = (String) sigid.get("sigid");
        return jeogiDao.selectFestival(signum);
    }

    @PostMapping("/accommodationData")
    public List<Map<String,Object>> accommodation(
        @RequestBody Map<String,Object> sigid
    ) {
        String signum = (String) sigid.get("sigid");
        return jeogiDao.selectAccommodation(signum);
    }

    @PostMapping("/tourCategory")
    public List<Map<String,Object>> tourcat(
        @RequestBody Map<String,Object> sigcat
    ) {
        String signum = (String) sigcat.get("sigid");
        String cat = (String) sigcat.get("category");
        return jeogiDao.selectSigCat(signum,cat);
    }
}
