const conn=require('../mariadb');
const {StatusCodes}=require('http-status-codes');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
const crypto=require('crypto');

dotenv.config();

const join=(req,res)=>{
    const {email,password}=req.body;

    const salt=crypto.randomBytes(64).toString('base64');
    const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64')

    let sql = 'INSERT INTO users (email, password, salt) VALUES(?,?,?)';
    let values = [email, hashPassword, salt];

    conn.query(sql, values,
        (err, results) => {
            if(err){
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            if(results.affectedRows){
                return res.status(StatusCodes.CREATED).json(results);
            }else{
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
        }
    )
};

const login=(req,res)=>{
    const {email,password}=req.body;
    let sql=`SELECT * FROM users WHERE email=?`

    conn.query(sql,email,
        (err,results)=>{
            if(err){
                console.log(err)
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            const loginUser=results[0];
            const hashPassword = crypto.pbkdf2Sync(password, loginUser.salt , 10000, 64, 'sha512').toString('base64')

            if(loginUser&&loginUser.password==hashPassword){
                // 토큰 발행
                const token=jwt.sign({
                    email: loginUser.email,
                    id: loginUser.id
                }, process.env.PRIVATE_KEY,{
                    expiresIn:'5m',
                    issuer:"subeen"
                });

                // 토큰 쿠키에 담기
                res.cookie("token",token, {
                    httpOnly: true
                });

                console.log(token);

                res.status(StatusCodes.OK).json({
                    token:token,
                    messgae: `로그인 되었습니다.`
                })
            }else{
                res.status(StatusCodes.UNAUTHORIZED).json({
                    message:'이메일 또는 비밀번호가 틀렸습니다.'
                })
            }
        }
    )
};

const passwordResetRequest=(req,res)=>{
    const {email}=req.body;
    let sql=`SELECT * FROM users WHERE email=?`;

    conn.query(sql,email,
        (err, results) => {
            if(err){
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            const user=results[0];
            if(user){
                return res.status(StatusCodes.OK).json({
                    email:email
                });
            }else{
                return res.status(StatusCodes.UNAUTHORIZED).end();
            }
        }
    )
};

const passwordReset=(req,res)=>{
    const {email, password}=req.body;

    let sql=`UPDATE users SET password=?, salt=? WHERE email=?`

    const salt=crypto.randomBytes(64).toString('base64');
    const hashPassword = crypto.pbkdf2Sync(password, loginUser.salt , 10000, 64, 'sha512').toString('base64')

    let values=[hashPassword,salt,email]

    conn.query(sql,values,
        (err,results)=>{
            if(err){
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            if(results.affectedRows==0){
                return res.status(StatusCodes.BAD_REQUEST).end();
            }else{
                return res.status(StatusCodes.OK).json(results)
            }
        }
    )
};

module.exports={join,login,passwordReset,passwordResetRequest}
