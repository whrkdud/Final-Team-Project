package com.project.jeogi.dao;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class JeogiDao {
    @Autowired
    JdbcTemplate jt;

    public List<Map<String,Object>> selectTourPlace(String signum) {
        String sqlStmt = String.format("SELECT * FROM tourplace WHERE code=%s", signum);
        return jt.queryForList(sqlStmt);
    }

    public List<Map<String,Object>> selectFestival(String signum) {
        String sqlStmt = String.format("SELECT * FROM festival WHERE code=%s ORDER BY startdate DESC", signum);
        return jt.queryForList(sqlStmt);
    }

    public List<Map<String,Object>> selectAccommodation(String signum) {
        String sqlStmt = String.format("SELECT * FROM accommodation WHERE code=%s", signum);
        return jt.queryForList(sqlStmt);
    }

    public List<Map<String,Object>> selectSigCat(String signum, String cat) {
        String sqlStmt = String.format("SELECT * FROM tourplace WHERE code=%s AND category='%s'", signum,cat);
        return jt.queryForList(sqlStmt);
    }

    public List<Map<String,Object>> selectCongestion(String nowdate, int nowtime) {
        String sqlStmt = String.format("SELECT loc_code,jam FROM predict_data WHERE date=%s AND hour=%d",nowdate,nowtime);
        return jt.queryForList(sqlStmt);
    }

    public List<Map<String,Object>> selectCongestionChange(String nowdate, int time) {
        String sqlStmt = String.format("SELECT loc_code,jam FROM predict_data WHERE date=%s AND hour=%d",nowdate,time);
        return jt.queryForList(sqlStmt);
    }
}
