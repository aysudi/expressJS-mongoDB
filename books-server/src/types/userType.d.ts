type User = {
  id: string;
  email: string;
  username: string;
  fullName: string;
  password: string;
  profileImage: string;
  public_id: string;
  role: string;
  isBanned: boolean;
  banUntil: NativeDate | null;
  loginAttempts: number;
  lockUntil: Date | null;
  wishlist: [];
  basket: [];
  address: {};
  provider: string;
  googleId: string | null;
  hasVendorRequest: boolean;
  emailVerified: boolean;
};

export default User;
