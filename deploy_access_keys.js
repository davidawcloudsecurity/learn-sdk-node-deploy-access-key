const AWS = require('aws-sdk');

class IAMSDK {
  constructor(region) {
    this.iam = new AWS.IAM({ region: region });
  }

  async createAccessKey(username) {
    try {
      const params = {
        UserName: username
      };
      
      const result = await this.iam.createAccessKey(params).promise();
      return {
        accessKeyId: result.AccessKey.AccessKeyId,
        secretAccessKey: result.AccessKey.SecretAccessKey
      };
    } catch (error) {
      console.error('Error creating access key:', error);
      throw error;
    }
  }

  async deleteAccessKey(username, accessKeyId) {
    try {
      const params = {
        UserName: username,
        AccessKeyId: accessKeyId
      };
      
      await this.iam.deleteAccessKey(params).promise();
      console.log(`Access key ${accessKeyId} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting access key:', error);
      throw error;
    }
  }

  async listAccessKeys(username) {
    try {
      const params = {
        UserName: username
      };
      
      const result = await this.iam.listAccessKeys(params).promise();
      return result.AccessKeyMetadata;
    } catch (error) {
      console.error('Error listing access keys:', error);
      throw error;
    }
  }
}

module.exports = IAMSDK;
