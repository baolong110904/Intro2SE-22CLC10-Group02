import stringify from "query-string"
import {
  fetchUtils,
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  UPDATE_MANY,
  DELETE,
  DELETE_MANY,
} from "react-admin"

export default (apiUrl, httpClient = fetchUtils.fetchJson) => {
  const convertDataRequestToHTTP = (type, resource, params) => {
    let url = ""
    const options = {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
    }
    switch (type) {
      case GET_LIST: {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        url = `${apiUrl}/${resource}?page=${page}&size=${perPage}&sort=${field},${order}`;

        let filterParts = [];

        let hasEnabledFilter = false;
        let hasGenderFilter = false;
        let hasRoleFilter = false;

        if (params.filter) {
          if (params.filter.isEnabled !== undefined && !hasEnabledFilter 
              && (params.filter.isEnabled === true || params.filter.isEnabled === false)) {
            hasEnabledFilter = true;
            filterParts.push(`isEnabled:${params.filter.isEnabled}`);
          }

          if (params.filter.gender !== undefined && !hasGenderFilter
              && (params.filter.gender === 'Male' || params.filter.gender === 'Female' || params.filter.gender === 'Other')) {
            hasGenderFilter = true;
            filterParts.push(`gender:'${params.filter.gender}'`);
          }

          if (params.filter.roles?.name !== undefined && !hasRoleFilter
              && (params.filter.roles.name === 'ADMIN' || params.filter.roles.name === 'STUDENT' || params.filter.roles.name === 'TEACHER')) {
            hasRoleFilter = true;
            filterParts.push(`roles.name:'${params.filter.roles.name}'`);
          }
        }

        console.log("Filter parts:", filterParts);

        if (filterParts.length > 0) {
          url += `&filter=${filterParts.join(' and ')}`;
        }

        console.log("Final URL:", url);
        break;
      }
      case GET_ONE:
        url = `${apiUrl}/${resource}/${params.id}`
        break
      case GET_MANY: {
        const query = {
          filter: JSON.stringify({ id: params.ids }),
        }
        let idStr = ""
        const queryString = params.ids.map((id) => idStr + `id=${id}`)
        url = `${apiUrl}/${resource}?${idStr}}`
        break
      }
      case GET_MANY_REFERENCE: {
        const { page, perPage } = params.pagination
        const { field, order } = params.sort
        url = `${apiUrl}/${resource}?page=${page}&size=${perPage}&sort=${field},${order}`

        let filterParts = [];

        let hasEnabledFilter = false;
        let hasGenderFilter = false;
        let hasRoleFilter = false;

        if (params.filter) {
          if (params.filter.isEnabled !== undefined && !hasEnabledFilter 
              && (params.filter.isEnabled === true || params.filter.isEnabled === false)) {
            hasEnabledFilter = true;
            filterParts.push(`isEnabled:${params.filter.isEnabled}`);
          }

          if (params.filter.gender !== undefined && !hasGenderFilter
              && (params.filter.gender === 'Male' || params.filter.gender === 'Female' || params.filter.gender === 'Other')) {
            hasGenderFilter = true;
            filterParts.push(`gender:'${params.filter.gender}'`);
          }

          if (params.filter.roles.name !== undefined && !hasRoleFilter
              && (params.filter.roles.name === 'ADMIN' || params.filter.roles.name === 'STUDENT' || params.filter.roles.name === 'TEACHER')) {
            hasRoleFilter = true;
            filterParts.push(`roles.name:'${params.filter.roles.name}'`);
          }
        }

        console.log("Filter parts:", filterParts);

        if (filterParts.length > 0) {
          url += `&filter=${filterParts.join(' and ')}`;
        }

        console.log("Final URL:", url);
        break
      }
      case UPDATE:
        url = `${apiUrl}/${resource}/${params.id}`
        options.method = "PUT"
        options.body = JSON.stringify(params.data)
        console.log("URL:", url)
        console.log("Options:", options)
        console.log("Payload:", params.data)
        console.log("Body:", options.body)
        break
      case CREATE:
        url = `${apiUrl}/${resource}`
        options.method = "POST"
        options.body = JSON.stringify(params.data)
        break
      case DELETE:
        url = `${apiUrl}/${resource}/${params.id}`
        options.method = "DELETE"
        break
      default:
        throw new Error(`Unsupported fetch action type ${type}`)
    }
    console.log("url", url)
    console.log("options", options)
    return { url, options }
  }

  const convertHTTPResponse = (response, type, resource, params) => {
    const { headers, json } = response
    console.log("API Response:", json)

    switch (type) {
      case GET_LIST:
      case GET_MANY:
      case GET_MANY_REFERENCE:
        if (!json.hasOwnProperty("data")) {
          throw new Error("The response must contain a data key")
        }
        return {
          data: json.data.result,
          total: json.data.meta.total,
        }
      case CREATE:
        return { data: { ...params.data, id: json.data.id } }
      case UPDATE:
        return { data: json.data }
      case DELETE:
        return { data: { id: params.id } }
      case DELETE_MANY:
        return { data: params.ids }
      default:
        return { data: json.data }
    }
  }

  return (type, resource, params) => {
    console.log("Type:", type)
    if (type === UPDATE_MANY) {
      return Promise.all(
        params.ids.map((id) =>
          httpClient(`${apiUrl}/${resource}/${id}`, {
            method: "PUT",
            body: JSON.stringify(params.data),
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }),
          }),
        ),
      ).then((responses) => ({
        data: responses.map((response) => response.json),
      }))
    }
    if (type === DELETE_MANY) {
      return Promise.all(
        params.ids.map((id) =>
          httpClient(`${apiUrl}/${resource}/${id}`, {
            method: "DELETE",
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }),
          }),
        ),
      ).then((responses) => ({
        data: responses.map((response) => response.json),
      }))
    }

    const { url, options } = convertDataRequestToHTTP(type, resource, params)
    console.log("URL:", url)
    console.log("Options:", options)
    if (!options) {
      options = {}
    }

    if (!options.headers) {
      options.headers = new Headers({ Accept: "application/json" })
    }

    return httpClient(url, options)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          console.log("API Error:", response)
          return Promise.reject(new Error(response.statusText))
        }
        return convertHTTPResponse(response, type, resource, params)
      })
      .catch((error) => {
        console.log("Fetch error:", error)
        return Promise.reject(error)
      })
  }
}
