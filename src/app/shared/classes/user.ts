export class User {
  name?: String;
  email: String;
  firstName?: String;
  lastName?: String;
  provider?: String;
  photoUrl?: String;
  password?: String;
  authToken?: String;

  constructor(email?: String) {
    this.email = email || '';
    this.name = '';
    this.firstName = '';
    this.lastName = '';
    this.provider = '';
    this.photoUrl = '';
    this.password = '';
    this.authToken = '';
  }

  public populateUser(user: any): User {
    let populatedUser = new User(user.email);
    populatedUser.firstName = user.firstName || '';
    populatedUser.lastName = user.lastName || '';
    populatedUser.name =
      user.name || `${user.firstName} ${user.lastName}` || '';
    populatedUser.photoUrl = user.photoUrl || '';
    populatedUser.provider = user.provider || 'local';
    populatedUser.password = user.password || '';
    return populatedUser;
  }
}
