# ToyProject
## 3. Unity화면 영상스트리밍 WPF에서 재생

+ ### 기간
	+ 20/12/14 ~ 21/01/08

+ ### 목적
	+ Unity화면을 Unity재생중인 기기와 다른 기기에서 동시에 재생하기 위함

+ ### 구현기능
	+ WPF에서 3가지 방법으로 스트리밍영상 재생
		+ WebRTC, WebEye(FFMpeg기반), Vlc
	+ Unity에서 2가지방법으로 스트리밍
		+ Unity(WebRTC) --- node.js(WebServer) --- WPF(Chromium Library)
		+ Unity(UnityCapture, UnityCam) --- OBS(캡쳐프로그램) --- Nginx(WebServer) --- WPF(WebEye Library OR Vlc)

+ ### 참조 URL
	+ UnityRenderStreaming(WebRTC)  

	+ WebRTC Tutorial  
		https://docs.unity3d.com/Packages/com.unity.renderstreaming@2.0/manual/en/tutorial.html  

	+ Chrome Browser Embedded in WPF  
		https://codepulse.tistory.com/1  

	+ WebApp(WebServer) git - node.js  
		https://github.com/Unity-Technologies/UnityRenderStreaming/tree/release/2.0.2/WebApp  
	  
	------------------------------------------------------------------------------------------  
	  
	+ UnityCapture  

	+ UnityCapture Git(OBS & Code)  
		https://github.com/schellingb/UnityCapture  

	+ WebEye(지연시간 상당함) - FFMPEG Rtmp Streaming in Winform&WPF library  
		https://www.codeproject.com/Articles/885869/Stream-Player-control  

	+ VLC기반 RTMP 플레이어 - FFMPEG기반보다 퍼포먼스 좋음(지연율 약 2초)  
		https://github.com/ZeBobo5/Vlc.DotNet  

	+ Nginx-Rtmp - Web Server(Rtmp)  
		https://github.com/illuspas/nginx-rtmp-win32  

	+ Nginx 설정법  
		https://seogilang.tistory.com/397  

	+ HDRP/URP에 적용법 - UnityCapture.cs 수정  
		https://github.com/schellingb/UnityCapture/issues/8

	+ Test용 Web RTMP Player  
		https://www.wowza.com/resources/3.6.0/examples/LiveVideoStreaming/FlashRTMPPlayer/player.html  
	  
	------------------------------------------------------------------------------------------  
	  
	+ UnityCam  

	+ UnityCam Git(OBS & Code)  
		https://github.com/mrayy/UnityCam  

	+ WebEye(지연시간 상당함) - FFMPEG Rtmp Streaming in Winform&WPF library  
		https://www.codeproject.com/Articles/885869/Stream-Player-control  

	+ VLC기반 RTMP 플레이어 - FFMPEG기반보다 퍼포먼스 좋음(지연율 약 2초)  
		https://github.com/ZeBobo5/Vlc.DotNet  

	+ Nginx-Rtmp - Web Server(Rtmp)  
		https://github.com/illuspas/nginx-rtmp-win32  

	+ Nginx 설정법  
		https://seogilang.tistory.com/397  

	+ HDRP/URP에 적용법 - UnityCam.cs 수정  

	```C#
	public RenderTexture source;

	private void Update()
	{ 
		var tempRT = RenderTexture.GetTemporary(640, 480);

		RenderImage(source, tempRT);
	}
	```
	+ Test용 Web RTMP Player  
		https://www.wowza.com/resources/3.6.0/examples/LiveVideoStreaming/FlashRTMPPlayer/player.html  

+ ### 구동 화면

| Unity(WebRTC)		 							| WPF(WebRTC)			 					|
| ------------ 									| ------------								|
| ![image.png](./Unity(WebRTC).png)				| ![image.png](./Images/WPF(WebRTC).png)	|

| Unity(UnityCapture) 							| Unity(UnityCam) 							|
| ------------ 									| ------------ 								|
| ![image.png](./Images/UnityCapture&OBS.png) 	| ![image.png](./Images/UnityCam.png) 		|

| WPF(WebEye) 									| WPF(Vlc) 									|
| ------------ 									| ------------ 								|
| ![image.png](./Images/WebEye.png) 			| ![image.png](./Images/Vlc.png) 			|  

+ ### 소스코드
	+ Git – https://github.com/ssm8887/WPF-ToyProject-3.UnitySceneStreaming  
	+ Yobi - http://ms-filesvr:9000/yobi/ssm8887/ToyProject-3.UnitySceneStreaming
