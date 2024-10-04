import { IStandardResponse } from '../../common/interfaces/response.interface';
import { IUserDocument, UserModel } from '../../dal/models/user.model';

export class AdminService {
  public async getClients(): Promise<IStandardResponse<IUserDocument[]>> {
    const clients: IUserDocument[] = await UserModel.find({ role: 'client' });
    return {
      statusCode: 200,
      success: true,
      data: clients,
      message: 'Clients retrieved successfully',
    };
  }

  public async updateClient(
    id: string,
    updateData: Partial<IUserDocument>,
  ): Promise<IStandardResponse<IUserDocument>> {
    const updatedClient: IUserDocument | null =
      await UserModel.findByIdAndUpdate(id, updateData, {
        new: true,
      });
    if (!updatedClient) {
      throw { statusCode: 404, message: 'Client not found' };
    }
    return {
      statusCode: 200,
      success: true,
      data: updatedClient,
      message: 'Client updated successfully',
    };
  }

  public async deleteClient(id: string): Promise<IStandardResponse<null>> {
    const deletedClient: IUserDocument | null =
      await UserModel.findByIdAndDelete(id);
    if (!deletedClient) {
      throw { statusCode: 404, message: 'Client not found' };
    }
    return {
      statusCode: 200,
      success: true,
      data: null,
      message: 'Client deleted successfully',
    };
  }
}
