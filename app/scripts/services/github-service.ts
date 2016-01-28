
import {Inject, Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import {toPromise} from 'rxjs/operator/toPromise';


@Injectable()
export default class GithubService {

  constructor(@Inject('dataService') private dataService, @Inject(Http) private http) {
   //
  }

  getIssueComment(owner, name, number) {
    return this.dataService.getAccessToken('?').then((accesstoken) => {
      var url = `https://api.github.com/repos/${owner}/${name}/issues/${number}/comments${accesstoken}`;
      return toPromise.call(this.http.get(url));
    });
  }

  isRepositoryStarred(fullName) {
    return this.dataService.getAccessToken('?')
    .then((accesstoken) => {
      var url = `https://api.github.com/user/starred/${fullName}${accesstoken}`;
      return toPromise.call(this.http.get(url));
    });
  }

  starRepository(fullName) {
    return this.dataService.getAccessToken('?')
    .then((accesstoken) => {
      var url = `https://api.github.com/user/starred/${fullName}${accesstoken}`;
      return toPromise.call(this.http.put(url));
    });
  }

  unStarRepository(fullName) {
    return this.dataService.getAccessToken('?')
    .then((accesstoken) => {
      var url = `https://api.github.com/user/starred/${fullName}${accesstoken}`;
      return toPromise.call(this.http.delete(url));
    });
  }

  editRepository(fullName, repositoryData) {
    return this.dataService.getAccessToken('?')
    .then((accesstoken) => {
      var url = `https://api.github.com/repos/${fullName}${accesstoken}`;
      return toPromise.call(this.http.patch(url, JSON.stringify(repositoryData)));
    });
  }

  searchRepositories(searchExp) {
    var promise = new Promise((resolve, reject) => {
      this.dataService.getAccessToken('&').then((accesstoken) => {
        var url = `https://api.github.com/search/repositories?q=${searchExp}+language:js+language:typescript&sort=stars&order=desc${accesstoken}`;
        return this.http.get(url)
          .map(response => response.json())
          .subscribe(data => resolve(data)
          , err => reject(err));
      });
    });
    return Observable.fromPromise(promise);
  }

  getAuthenticatedUserEvents(userName) {
    return this.dataService.getAccessToken('?')
    .then((accesstoken) => {
      var url = `https://api.github.com/users/${userName}/events${accesstoken}`;
      return toPromise.call(this.http.get(url));
    });
  };

}
