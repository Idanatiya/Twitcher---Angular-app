import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fetchJson',
  pure: false
})
export class FetchJsonPipe implements PipeTransform {
  //saving the data
  private cachedData = null

  //url
  private cachedUrl = null
  constructor(private http: HttpClient) { }

  transform(url: string): any {
    //if the passed in url is not the url that saved in the pipe we do a request.
    if (url !== this.cachedUrl) {
      this.cachedData = null
      this.cachedUrl = url
      this.http.get(url).subscribe(res => {
        this.cachedData = res
      })
    }
    return JSON.stringify(this.cachedData)
  }

}
