const {sendMail} = require('../_helpers/email');

module.exports = function Registration(sequelize, dataTypes) {
    const User = sequelize.define('Registration', {
        id: {
            primaryKey: true,
            type: dataTypes.BIGINT,
            autoIncrement: true
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Email already in use'
            },
            validate: {
                isEmail: true
            }
        },
        password: {
            type: dataTypes.STRING(100),
            allowNull: false,
            validate: {
                is: {
                    args: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                    msg: 'Password insecure'
                }
            }
        },
        phone: {
            type: dataTypes.STRING(50),
            allowNull: false,
        },
        code_sms: {
            type: dataTypes.INTEGER,
        },
        code_email: {
            type: dataTypes.UUID,
            defaultValue: dataTypes.UUIDV4
        },
        code_valid_to: {
            type: dataTypes.DATE,
            allowNull: false,
            defaultValue: dataTypes.NOW
        },
        created_at: {
            type: dataTypes.DATE,
            allowNull: false,
            defaultValue: dataTypes.NOW
        },
    }, {
        tableName: 'registration',
        freezeTableName: true,
        timestamps: false,
        underscored: true,
        hooks: {
            afterCreate,
            beforeCreate,
        }
    });

    return User;
}

function beforeCreate(user) {

    user.setDataValue('code_sms', Math.floor(Math.random() * (429496 - 700 + 1) + 700));
    return user;
}

async function afterCreate(user) {
    try {
        await sendMail({
            to: user.email,
            confirmation_code: user.code_email
        });
        // add 15 minutes to expiration
        const time = user.code_valid_to.getTime() + 1000 * 60 * 15;
        await user.update({
            'code_valid_to': time
        });
    } catch (e) {
        throw new Error('Failed to send email!');
    }

}
