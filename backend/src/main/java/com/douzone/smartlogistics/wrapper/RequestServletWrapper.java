package com.douzone.smartlogistics.wrapper;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import javax.servlet.ReadListener;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

import org.springframework.util.StreamUtils;

import lombok.SneakyThrows;

public class RequestServletWrapper extends HttpServletRequestWrapper{
	 private byte[] cachedBody;

	    public RequestServletWrapper(HttpServletRequest request) throws IOException {
	        super(request);
	        InputStream requestInputStream = request.getInputStream();
	        this.cachedBody = StreamUtils.copyToByteArray(requestInputStream);
	    }

	    @Override
	    public ServletInputStream getInputStream() throws IOException {
	        return new CachedBodyServletInputStream(this.cachedBody);
	    }

	    @Override
	    public BufferedReader getReader() throws IOException {
	        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(this.cachedBody);
	        return new BufferedReader(new InputStreamReader(byteArrayInputStream, "UTF-8"));
	    }

	    /*
	    Inner Class
	     */
	    public class CachedBodyServletInputStream extends ServletInputStream {

	        private InputStream RequestServletWrapper;

	        public CachedBodyServletInputStream(byte[] cachedBody) {
	            this.RequestServletWrapper = new ByteArrayInputStream(cachedBody);
	        }

	        @SneakyThrows
	        @Override
	        public boolean isFinished() {
	            return RequestServletWrapper.available() == 0;
	        }

	        @Override
	        public boolean isReady() {
	            return true;
	        }

	        @Override
	        public void setReadListener(ReadListener readListener) {
	        }

	        @Override
	        public int read() throws IOException {
	            return RequestServletWrapper.read();
	        }
	    }
}
