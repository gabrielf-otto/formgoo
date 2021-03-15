import ITokenSignDTO from '../dtos/ITokenSignDTO';


export default interface ITokenProvider {
   sign: (data: ITokenSignDTO) => Promise<string>;
   verify: (token: string, secret: string) => Promise<string | object>;
}
