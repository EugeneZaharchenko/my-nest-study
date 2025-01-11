FROM mysql:8.0

ENV MYSQL_ROOT_PASSWORD=rootpass
ENV MYSQL_DATABASE=my-nest-study
ENV MYSQL_USER=nestuser
ENV MYSQL_PASSWORD=nestpass

EXPOSE 3306

# docker run --name my-study-cont -p 3306:3306 -d my-study
# docker run --name my-nest-study-cont -p 3306:3306 -v my-study-mysql-data:/var/lib/mysql -d my-nest-study
