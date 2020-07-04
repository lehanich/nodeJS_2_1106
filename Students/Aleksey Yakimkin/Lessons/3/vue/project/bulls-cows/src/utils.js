const baseURL = 'http://localhost:3000'

export function makeGetRequest (url, method) {
  url = baseURL + url
  return new Promise((resolve, reject) => {
    let xhr
    if (window.XMLHttpRequest) {
      xhr = new window.XMLHttpRequest()
    } else {
      xhr = new window.ActiveXObject('Microsoft.XMLHTTP')
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) {
          reject(xhr.responceText)
        }
        const body = JSON.parse(xhr.responseText)
        resolve(body)
      }
    }
    xhr.onerror = function (err) {
      reject(err)
    }
    xhr.open(method, url)
    xhr.send()
  })
}

export function makePostRequest (url, method, data) {
  url = baseURL + url
  return new Promise((resolve, reject) => {
    let xhr
    if (window.XMLHttpRequest) {
      xhr = new window.XMLHttpRequest()
    } else {
      xhr = new window.ActiveXObject('Microsoft.XMLHTTP')
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) {
          reject(xhr.responceText)
        }
        const body = JSON.parse(xhr.responseText)
        resolve(body)
      }
    }
    xhr.onerror = function (err) {
      reject(err)
    }
    xhr.open(method, url)
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
    console.dir(data)
    console.log(JSON.stringify(data))
    xhr.send(JSON.stringify(data))
  })
}
