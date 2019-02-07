database is a collection information/data
has an interface

SQL(relational) vs NOSQL(non-relational)
SQL databases are tabular databases and they are flat


一些指令：
./mongod    启动mongo开始监听

mongo   启动mongo

help

show dbs    展示现有所有数据库

use     创建新的数据库

insert  db.xxx.insert()

find    db.xxx.find()里面有key-value对就是搜索具体对象，没有就是返回全部

update  里面有两个参数，第一个找到对象，第二个没有$set:时全部覆盖；有$set:时不删除没有添加的内容，只修改和添加

remove  remove所有匹配的

CRUD是create,read,update,delete


mongoose是一个可以用npm下载的工具，使我们可以操作mongodb而不需要JS指令
它是一个ODM-object data mapper,他是使JS语言与database互动的工具