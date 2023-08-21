// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {

//   private clientId = '27bb4754053440f5a691aca4a7f4906a';
//   private clientSecret = '2caad77cfa0045ffb581fea727c30a00';
//   private tokenUrl = 'https://accounts.spotify.com/api/token';

//   accessToken : any;
//   headers : any;
//   http: any;

//   intercept(request: HttpRequest<any>, next: HttpHandler) {
//     // Add your custom headers here
//     let headers = new HttpHeaders({
//     });
// debugger
//     let r = this.getToken().subscribe((response: any) => {
//       this.accessToken = response.access_token;
//       headers = new HttpHeaders({
//         Authorization: 'Bearer ' + this.accessToken,
//         'Content-Type': 'application/json',
//       });
//     });

//     // Clone the request and set the headers
//     const modifiedRequest = request.clone({ headers });

//     // Pass the modified request to the next interceptor or to the HttpClient if no interceptors are left
//     return next.handle(modifiedRequest);
//   }

//   getToken() {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/x-www-form-urlencoded',
//       Authorization: 'Basic ' + btoa(this.clientId + ':' + this.clientSecret),
//     });

//     const body = 'grant_type=client_credentials';

//     return this.http.post(this.tokenUrl, body, { headers });
//   }

//   // implementToken(){
//   //   return this.getToken().subscribe((response: any) => {
//   //     this.accessToken = response.access_token;
//   //     this.headers = new HttpHeaders({
//   //       Authorization: 'Bearer ' + this.accessToken,
//   //     });
//   //   });

//   // }

// }
