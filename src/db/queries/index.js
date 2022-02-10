const userQueries = {
    registerUser: `
    INSERT INTO users (
        first_name,
        last_name,
        email,
        phone_number,
        gender,
        password,
        role
    ) VALUES($1, $2, LOWER($3), $4, $5, $6, 'user')
    RETURNING 
        id,
        first_name,
        last_name,
        email,
        phone_number,
        gender,
        role
   `,
   registerAdmin: `
   INSERT INTO users (
       first_name,
       last_name,
       email,
       phone_number,
       gender,
       password,
       role
   ) VALUES($1, $2, LOWER($3), $4, $5, $6, 'admin')
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
    getUserById: `
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
    WHERE id=$1 
    `,
    getPaginatedUsers: `
        SELECT 
            id,
            first_name,
            last_name,
            email,
            phone_number,
            gender,
            role
        FROM users
        ORDER BY id limit $1 offset $2
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
    getAllAdmin: `
    SELECT 
        id,
        first_name,
        last_name,
        email,
        phone_number,
        gender,
        role
    FROM users
    WHERE role = 'admin'
    `,
    updatePassword: `
    UPDATE users SET password=$1, updated_at=NOW()
    WHERE email=$2
      `,
    updateResetCode: `
    UPDATE users SET reset_code=$1, updated_at=NOW()
    WHERE email=$2
    `,
    removeResetCode: `
    UPDATE users SET reset_code='', updated_at=NOW()
    WHERE email=$1
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
    UPDATE users SET password=$1, updated_at=NOW()
    WHERE email=$2
      `,
    getAdminProfile: `
    SELECT 
        id,
        first_name,
        last_name,
        email,
        gender,
        phone_number,
        role
    FROM users
    WHERE id=$1 
      `,
    updateAdminById: `
    UPDATE users
    SET 
        first_name=$1,
        last_name=$2,
        phone_number=$3,
        gender=$4,
        updated_at=NOW()
    WHERE id=$5
    RETURNING 
        id,
        first_name,
        last_name,
        email,
        gender,
        phone_number
    `,
    searchUserByFirstName: `
    SELECT
        id,
        first_name,
        last_name,
        email,
        phone_number,
        gender,
        role
    FROM users
    WHERE to_tsvector(first_name||' ' || last_name) @@to_tsquery($1)
`,
  };
  
  export default userQueries;
  