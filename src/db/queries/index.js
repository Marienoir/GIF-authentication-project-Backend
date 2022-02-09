const userQueries = {
    registerUser: `
    INSERT INTO users (
        first_name,
        last_name,
        email,
        phone_number,
        gender,
        password,
        confirm_password,
        role
    ) VALUES($1, $2, LOWER($3), $4, $5, $6, $7, 'user')
    RETURNING 
        id,
        first_name,
        last_name,
        email,
        phone_number,
        gender,
        role
   `,
   getUserByEmail: `
    SELECT 
        id,
        first_name,
        last_name,
        email,
        phone_number,
        gender,
        password,
        role
    FROM users
    WHERE email=$1 
      `,
    getAllUsers: `
    SELECT 
        id,
        first_name,
        last_name,
        email,
        phone_number,
        gender,
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
        first_name,
        last_name, 
        email,
        reset_code
    FROM users
    WHERE reset_code=$1
    `,
    changePassword: `
    UPDATE users SET password=$1, confirm_password=$2
    WHERE email=$3
      `,
  };
  
  export default userQueries;
  