# 高校邦 

## runtime


## 前端工程开发编译步骤
1.安装nodeJs,
2.执行 exec.sh

## tips

建议 使用 idea 代码 格式化统一 
plugins 安装 ejs ,markdown support 支持
ejs :模版语法高亮支持
markdown support :方便 书写阅读 readme.md


## maven 
<plugin>
    <artifactId>exec-maven-plugin</artifactId>
    <groupId>org.codehaus.mojo</groupId>
    <executions>
        <execution>
            <id>frontend</id>
            <phase>generate-sources</phase>
            <goals>
                <goal>exec</goal>
            </goals>
            <configuration>
                <executable>${basedir}/exec.sh</executable>
            </configuration>
        </execution>
    </executions>
</plugin>