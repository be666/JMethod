/**
 * Created by bcaring on 16/3/23.
 */
'use strict';
let path = require('path');
let mysqldesc = require('mysqldesc');
let fs = require('fs');
let mkdirp = require('mkdirp');
let crypto = require('crypto');
let camelCase = (colName, h)=> {

    colName = colName.split('_');
    let l = colName.length;
    while (l--) {
        let s = colName[l].substring(0, 1);
        let e = '';
        if (colName[l].length > 1) {
            e = colName[l].substring(1, colName[l].length);
        }
        colName[l] = s.toUpperCase() + e;
    }
    colName = colName.join('');
    if (h) {
        return colName;
    }
    let s = colName.substring(0, 1);
    let e = '';
    if (colName.length > 1) {
        e = colName.substring(1, colName.length);
    }
    return s.toLowerCase() + e;
};


let moduleFormat = (moduleName)=> {
    let s = moduleName.substring(0, 1);
    let e = '';
    if (moduleName.length > 1) {
        e = moduleName.substring(1, moduleName.length);
    }
    return s.toUpperCase() + e;
};


let serialVersionUID = ()=> {
    return String(parseInt(crypto.randomBytes(8).toString('hex'), '16') + '').substring(0, 18)
};


let resType = (cloType)=> {
    if (/^datetime/.test(cloType)) {
        return 'Date';
    } else if (/^bigint/.test(cloType)) {
        return 'Long';
    } else if (/^int/.test(cloType)) {
        return 'Integer';
    } else if (/^varchar/.test(cloType)) {
        return 'String';
    } else if (/^text/.test(cloType)) {
        return 'String';
    } else {
        console.log(cloType)
    }
};

let exportCtrl = (packageUrl, moduleName)=> {
    let template = [];
    template.push(`package com.imethod.service.${moduleName}.controller;`);
    template.push(`\n`);
    //template.push(`import com.imethod.service.${moduleName}.service.${moduleFormat(moduleName)}Service;`);
    //template.push(`import org.springframework.beans.factory.annotation.Autowired;`);
    template.push(`import org.springframework.stereotype.Controller;`);
    template.push(`\n`);
    template.push(`@Controller`);
    template.push(`public class ${moduleFormat(moduleName)}Ctrl {`);
    template.push(`\n`);
    //template.push(`    @Autowired`);
    //template.push(`    private ${moduleFormat(moduleName)}Service ${moduleName}Service;`);
    template.push(`\n`);
    template.push(`}`);
    let ctrlDir = path.resolve(packageUrl, `${moduleName}/controller/`);
    mkdirp.sync(ctrlDir);
    let ctrlPath = path.resolve(packageUrl, `${moduleName}/controller/${moduleFormat(moduleName)}Ctrl.java`);
    fs.writeFileSync(ctrlPath, template.join("\n"), {encoding: "utf-8"});
};

let exportService = (packageUrl, moduleName)=> {
    let template = [];
    template.push(`package com.imethod.service.${moduleName}.service;`);
    template.push(`\n`);
    template.push(`import com.imethod.core.log.Logger;`);
    template.push(`import com.imethod.core.log.LoggerFactory;`);
    template.push(`\n`);
    template.push(`import org.springframework.stereotype.Service;`);
    template.push(`\n`);
    template.push(`@Service`);
    template.push(`public class ${moduleFormat(moduleName)}Service {`);
    template.push(`\n`);
    template.push(`    Logger logger = LoggerFactory.getLogger(${moduleFormat(moduleName)}Service.class);`);
    template.push(`\n`);
    template.push(`\n`);
    template.push(`}`);
    let serDir = path.resolve(packageUrl, `${moduleName}/service/`);
    mkdirp.sync(serDir);
    let serPath = path.resolve(packageUrl, `${moduleName}/service/${moduleFormat(moduleName)}Service.java`);
    fs.writeFileSync(serPath, template.join("\n"), {encoding: "utf-8"});
};

let exportEntityService = (packageUrl, moduleName, entityName, pk)=> {
    entityName = camelCase(entityName);
    let template = [];
    template.push(`package com.imethod.service.${moduleName}.service;`);
    template.push(`\n`);
    template.push(`import com.imethod.core.bean.PageMaker;`);
    template.push(`import com.imethod.core.log.Logger;`);
    template.push(`import com.imethod.core.log.LoggerFactory;`);
    template.push(`import com.imethod.core.util.ExceptionTools;`);
    template.push(`import com.imethod.service.${moduleName}.dao.${moduleFormat(entityName)}Dao;`);
    template.push(`import com.imethod.service.${moduleName}.domain.${moduleFormat(entityName)};`);
    template.push(`import org.springframework.beans.factory.annotation.Autowired;`);
    template.push(`import org.springframework.stereotype.Service;`);
    template.push(`\n`);
    template.push(`import java.lang.reflect.InvocationTargetException;`);
    template.push(`\n`);
    template.push(`@Service`);
    template.push(`public class ${moduleFormat(entityName)}Service {`);
    template.push(`\n`);
    template.push(`    Logger logger = LoggerFactory.getLogger(${moduleFormat(entityName)}Service.class);`);
    template.push(`\n`);
    template.push(`    @Autowired`);
    template.push(`    private ${moduleFormat(entityName)}Dao ${entityName}Dao;`);
    template.push(`\n`);
    template.push(`    public void insert(${moduleFormat(entityName)} ${entityName}) {`);
    template.push(`        ${entityName}Dao.insert(${entityName});`);
    template.push(`    }`);
    template.push(`\n`);
    template.push(`    public void update(${moduleFormat(entityName)} ${entityName}) {`);
    template.push(`        try {`);
    template.push(`            ${entityName}Dao.update(${entityName});`);
    template.push(`        } catch (IllegalAccessException | InvocationTargetException e) {`);
    template.push(`            logger.error(e.getMessage());`);
    template.push(`            ExceptionTools.unchecked(e);`);
    template.push(`        }`);
    template.push(`    }`);
    template.push(`\n`);
    template.push(`    public PageMaker list(Long pageIndex, Long pageSize) {`);
    template.push(`        return ${entityName}Dao.list(pageIndex, pageSize);`);
    template.push(`    }`);
    template.push(`\n`);
    template.push(`    public ${moduleFormat(entityName)} loadById(Long ${camelCase(pk)}) {`);
    template.push(`        return ${entityName}Dao.loadById(${camelCase(pk)});`);
    template.push(`    }`);
    template.push(`\n`);
    template.push(`}`);
    let serDir = path.resolve(packageUrl, `${moduleName}/service/`);
    mkdirp.sync(serDir);
    let serPath = path.resolve(packageUrl, `${moduleName}/service/${moduleFormat(entityName)}Service.java`)
    fs.writeFileSync(serPath, template.join("\n"), {encoding: "utf-8"});
};

let exportEntityDao = (packageUrl, moduleName, entityName, pk)=> {
    let lowEntityName = entityName;
    entityName = camelCase(entityName);
    let template = [];
    template.push(`package com.imethod.service.${moduleName}.dao;`);
    template.push(`\n`);
    template.push(`import com.imethod.core.bean.PageMaker;`);
    template.push(`import com.imethod.service.${moduleName}.domain.${moduleFormat(entityName)};`);
    template.push(`import com.imethod.core.jdbc.mine.IBaseDao;`);
    template.push(`import org.springframework.stereotype.Repository;`);
    template.push(`\n`);
    template.push(`import java.lang.reflect.InvocationTargetException;`);
    template.push(`import java.util.HashMap;`);
    template.push(`import java.util.Map;`);
    template.push(`\n`);
    template.push(`@Repository`);
    template.push(`public class ${moduleFormat(entityName)}Dao extends IBaseDao {`);
    template.push(`\n`);
    template.push(`    public ${moduleFormat(entityName)} loadById(Long ${camelCase(pk)}) {`);
    template.push(`        Map<String, Object> map = new HashMap<>();`);
    template.push(`        map.put("${pk}", ${camelCase(pk)});`);
    template.push(`        ${moduleFormat(entityName)} ${entityName} = null;`);
    template.push(`        try {`);
    template.push(`            ${entityName} = load(${moduleFormat(entityName)}.class, map);`);
    template.push(`        } catch (IllegalAccessException | InstantiationException | InvocationTargetException e) {`);
    template.push(`            e.printStackTrace();`);
    template.push(`        }`);
    template.push(`        return ${entityName};`);
    template.push(`    }`);
    template.push(`\n`);
    template.push(`    String SQL_LIST_${entityName.toUpperCase()} = "select * from ${lowEntityName} where state = 1 ";`);
    template.push(`\n`);
    template.push(`    public PageMaker list(Long pageIndex, Long pageSize) {`);
    template.push(`        return this.queryPageList(SQL_LIST_${entityName.toUpperCase()}, pageIndex, pageSize, new HashMap<>());`);
    template.push(`    }`);
    template.push(`\n`);
    template.push(`}`);
    let serDir = path.resolve(packageUrl, `${moduleName}/dao/`);
    mkdirp.sync(serDir);
    let serPath = path.resolve(packageUrl, `${moduleName}/dao/${moduleFormat(entityName)}Dao.java`)
    fs.writeFileSync(serPath, template.join("\n"), {encoding: "utf-8"});
};

let exportEntityDomain = (packageUrl, moduleName, entityName, entity)=> {
    let packageArr = [];
    let methodArr = [];
    let attrArr = [];
    packageArr.push(`package com.imethod.service.${moduleName}.domain;`);
    packageArr.push(`\n`);
    packageArr.push('import com.imethod.core.bean.base.BasicEntity;\n');
    packageArr.push('import javax.persistence.Basic;');
    packageArr.push('import javax.persistence.Column;');
    packageArr.push('import javax.persistence.Entity;');
    packageArr.push('import javax.persistence.Id;');
    let hasDate = false;
    for (let colName in entity) {
        let col = entity[colName];
        let colType = resType(col.Type);
        let key = col.Key;
        if (camelCase(colName) == 'state' || camelCase(colName) == 'creatorId' || camelCase(colName) == 'createAt' || camelCase(colName) == 'updaterId' || camelCase(colName) == 'updateAt') {
            continue;
        }
        attrArr.push(`    private ${colType} ${camelCase(colName)};`)

        if (colType == 'Date') {
            hasDate = true;
        }

        if (key == 'PRI') {
            methodArr.push(
                `    @Id\n` +
                `    @Column(name = "${colName}")\n` +
                `    public ${colType} ${camelCase('get_' + colName)}() {\n` +
                `        return ${camelCase(colName)};\n` +
                `    }\n`
            );
        } else {
            methodArr.push(
                `    @Basic\n` +
                `    @Column(name = "${colName}")\n` +
                `    public ${colType} ${camelCase('get_' + colName)}() {\n` +
                `        return ${camelCase(colName)};\n` +
                `    }\n`
            );
        }
        methodArr.push(
            `    public void ${camelCase('set_' + colName)}(${colType} ${camelCase(colName)}) {\n` +
            `        this.${camelCase(colName)} = ${camelCase(colName)};\n` +
            `    }\n`
        );
    }
    if (hasDate) {
        packageArr.push('import java.util.Date;\n');
    }
    let classStr = [];
    classStr.push(packageArr.join('\n'));
    classStr.push('\n');
    classStr.push(
        `@Entity\n` +
        `public class ${camelCase(entityName, true)} extends BasicEntity {\n`
    );
    classStr.push(`    private static final long serialVersionUID = -${serialVersionUID()}L;`);
    classStr.push(attrArr.join('\n'));
    classStr.push('\n');
    classStr.push(methodArr.join('\n'));
    classStr.push(
        `}\n`
    );

    let serDir = path.resolve(packageUrl, `${moduleName}/domain/`);
    mkdirp.sync(serDir);
    let serPath = path.resolve(packageUrl, `${moduleName}/domain/${camelCase(entityName, true)}.java`)
    fs.writeFileSync(serPath, classStr.join("\n"), {encoding: "utf-8"});
};


export let mvc = function (packageUrl, modules, dbConf) {
    mysqldesc(dbConf, function (err, data) {
        for (let moduleName in modules) {
            exportCtrl(packageUrl, moduleName);
            //exportService(packageUrl, moduleName);
            let module = modules[moduleName];
            for (let entityName of module) {
                let entity = data[entityName];
                let pk = null;
                for (let col in entity) {
                    if (entity[col]['Key'] == 'PRI') {
                        pk = col;
                        break;
                    }
                }
                exportEntityService(packageUrl, moduleName, entityName, pk);
                exportEntityDao(packageUrl, moduleName, entityName, pk);
                exportEntityDomain(packageUrl, moduleName, entityName, entity, pk);
            }
        }
    })


};


let seaCtrl = (seaUrl, moduleName, entityName)=> {
    var template = [];
    template.push(`define('controller/${entityName}', [`);
    template.push(`    'service/${moduleName}_service',`);
    template.push(`    "template"`);
    template.push(`], function (require, exports, module) {`);
    template.push('\n');
    template.push(`    var ${moduleName}Service = require("service/${moduleName}_service");`);
    template.push('\n');
    template.push(`    var utils = iMethod.utils;`);
    template.push('\n');
    template.push(`    iMethod.controller.${entityName} = module.exports;`);
    template.push(`});`);
    let serDir = path.resolve(seaUrl, `06-controller/`);
    mkdirp.sync(serDir);
    let serPath = path.resolve(seaUrl, `06-controller/${entityName}.js`);
    fs.writeFileSync(serPath, template.join('\n'), {encoding: "utf-8"});
};

let seaSer = (seaUrl, entityName)=> {
    var template = [];
    template.push(`define('service/${entityName}_service', function (require, exports, module) {`);
    template.push('\n');
    template.push(`    iMethod.service.${entityName}_service = module.exports`);
    template.push('\n');
    template.push(`});`);
    let serDir = path.resolve(seaUrl, `02-service/`);
    mkdirp.sync(serDir);
    let serPath = path.resolve(seaUrl, `02-service/${entityName}_service.js`);
    fs.writeFileSync(serPath, template.join('\n'), {encoding: "utf-8"});
};

let seaVi = (seaUrl, moduleName)=> {
    let ViDir = path.resolve(seaUrl, `04-template/view/${moduleName}`);
    let keep = path.resolve(seaUrl, `04-template/view/${moduleName}/.keep`);
    mkdirp.sync(ViDir);
    fs.writeFileSync(keep, `view/${moduleName}/.keep`, {encoding: "utf-8"});
};

export let sea = (seaUrl, modules)=> {
    for (let moduleName in modules) {
        let module = modules[moduleName];
        seaCtrl(seaUrl, moduleName, moduleName);
        seaSer(seaUrl, moduleName);
        seaVi(seaUrl, moduleName);
        for (let entityName of module) {
            if (moduleName != entityName) {
                seaCtrl(seaUrl, moduleName, entityName);
            }
        }
    }
};


let config = {
    user: 'wx',
    password: '123456',
    host: 'localhost',
    database: 'wx'
};

let packageUrl = 'src/main/java/com/imethod/service';
let seaUrl = 'src/main/webapp/asset/sea/javascript';
let modules = {
    'code': [
        'code'
    ],
    'sys': [
        'org',
        'region',
        'user',
        'os_user',
        'os_ticket',
        'menu',
        'rule'
    ],
    'record': [
        'log_record',
        'login_record',
        'visit_record'
    ]
};

//mvc(packageUrl, modules, config);

//sea(seaUrl, modules);