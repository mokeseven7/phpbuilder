#Lambda base image Amazon linux
FROM public.ecr.aws/lambda/provided
# Set desired PHP Version
ARG php_version="8.2.2"
RUN yum clean all && \
    yum install -y autoconf \
                bison \
                bzip2-devel \
                gcc \
                gcc-c++ \
                git \
                gzip \
                libcurl-devel \
                libxml2-devel \
                make \
                openssl-devel \
                tar \
                unzip \
                zip \
                re2c \ 
                sqlite-devel 

# Download the PHP source, compile, and install both PHP and Composer
RUN curl -sL https://github.com/php/php-src/archive/refs/tags/php-${php_version}.tar.gz | tar -xvz && \
    cd php-src-php-${php_version} && \
    ./buildconf --force && \
    ./configure --prefix=/opt/php-8-bin/ --with-openssl --with-onig=/usr/lib64 --with-curl --with-zlib --without-pear --enable-bcmath --with-bz2 --with-mysqli && \
    make -j 5 && \
    make install && \
    /opt/php-8-bin/bin/php -v 