import service from '../utils/request'

interface IParams {
  [key: string]: any
}
export function getVideoList(params: IParams) {
  return service({
    url: '/api/deskto.php',
    method: 'GET',
    params,
  })
}
