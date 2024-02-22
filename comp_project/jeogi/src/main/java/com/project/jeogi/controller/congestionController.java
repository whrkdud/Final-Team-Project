package com.project.jeogi.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.jeogi.dao.JeogiDao;

@RestController
@CrossOrigin(origins = "*")
public class congestionController {
    @Autowired
    JeogiDao jeogiDao;

    @PostMapping("/congestion")
    public List<Map<String,Object>> congestion(){
        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();
        String nowdate = today.format(DateTimeFormatter.ofPattern("YYYYMMdd"));
        int nowtime = now.getHour();
        return jeogiDao.selectCongestion(nowdate,nowtime);
    }

    @PostMapping("/congestionChange")
    public List<Map<String,Object>> congestionChange(
        @RequestBody Map<String,Object> timedata
    ) {
        int time = (int) timedata.get("time");
        LocalDate today = LocalDate.now();
        String nowdate = today.format(DateTimeFormatter.ofPattern("YYYYMMdd"));
        LocalTime now = LocalTime.now();
        int nowtime = now.getHour();
        if (nowtime+time  > 23){
            int tmp = Integer.parseInt(nowdate)+1;
            nowdate = Integer.toString(tmp);
            nowtime = nowtime-24;
        }
        
        return jeogiDao.selectCongestionChange(nowdate,nowtime+time);

    }
}
