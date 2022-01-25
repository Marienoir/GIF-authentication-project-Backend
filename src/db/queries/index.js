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
  };
  
  export default userQueries;
  