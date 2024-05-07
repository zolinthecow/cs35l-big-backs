export default interface IAuth0ManagementService {
  getAccessToken(refetch?: boolean): Promise<string>;
}
