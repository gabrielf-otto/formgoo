
export default interface ITokenSignDTO {
   payload: object;
   user_id: string;
   secret: string;
   expiresIn: string | undefined;
}
