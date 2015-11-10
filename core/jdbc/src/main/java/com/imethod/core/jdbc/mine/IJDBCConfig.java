package com.imethod.core.jdbc.mine;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

/**
 * auth : bqxu
 * time : 15/11/10
 * desc :
 */
@Repository
@Data
public class IJDBCConfig {

    @Value("${com.imethod.jdbc.table.T_SYS_SEQUENCE_INFO}")
    private String tSysSequenceInfo;

    public String getProperty(String substring) {
        return null;
    }
}
