const userQueries = {
    registerUser: `
    INSERT INTO users (
        name,
        email,
        phone_number,
        password,
        confirm_password,
        role
    ) VALUES($1, LOWER($2), $3, $4, $5, 'user')
    RETURNING 
        id,
        name,
        email,
        phone_number,
        role
   `,
   getUserByEmail: `
    SELECT 
        id,
        name,
        email,
        phone_number,
        password,
        role
    FROM users
    WHERE email=$1 
      `,
    getAllUsers: `
    SELECT 
        id,
        name,
        email,
        phone_number,
        role
    FROM users
      `,
    updatePassword: `
    UPDATE users SET password=$1, confirm_password=$2
    WHERE email=$3
      `,
    updateResetCode: `
    UPDATE users SET reset_code=$1
    WHERE email=$2
    `,
    validateResetCode: `
    SELECT 
        name, 
        email,
        reset_code
    FROM users
    WHERE reset_code=$1
    `
  };
  
  export default userQueries;
  