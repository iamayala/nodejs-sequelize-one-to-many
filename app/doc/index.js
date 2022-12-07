/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - fullname
 *         - account_type
 *         - number
 *         - balance
 *         - isAdmin
 *       properties:
 *          id:
 *              type: integer
 *              description: The auto-generated id of the user
 *          email:
 *              type: string
 *              description: User's email
 *          password:
 *              type: string
 *              description: User's password
 *          fullname:
 *              type: string
 *              description: User's full name
 *          account_type:
 *              type: string
 *              description: User's account type
 *          number:
 *              type: string
 *              description: User's account number
 *          balance:
 *              type: integer
 *              description: User's account balance
 *          isAdmin:
 *              type: boolean
 *              description: User's priviledge
 *       example:
 *          email: 1234567890
 *          password: "abc@123"
 *          fullname: "Will Smith"
 *          account_type: "savings account"
 *          number: "234345671"
 *          balance: 35000
 *          isAdmin: false
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       required:
 *         - amount
 *         - type
 *         - date
 *         - sender
 *         - receiver
 *       properties:
 *          id:
 *              type: integer
 *              description: The auto-generated id of the transaction
 *          amount:
 *              type: integer
 *              description: Amount that was transacted
 *          type:
 *              type: string
 *              description: Transaction Type
 *          date:
 *              type: string
 *              description: Date of transaction
 *          sender:
 *              type: integer
 *              description: Sender's id
 *          receiver:
 *              type: string
 *              description: Receiver's id
 *       example:
 *          id: 1234567890
 *          amount: 15000
 *          type: "Deposit"
 *          date: "2022-12-01 05:18:45"
 *          sender: 1234567890
 *          receiver: 1234567823
 */

/**
 * @swagger
 * /users/all:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *               example:
 *                  id: 123334564
 *                  email: "user@user.com"
 *                  password: "abc@123"
 *                  fullname: "Will Smith"
 *                  account_type: "Savings Account"
 *                  number: "1230985438"
 *                  balance: 50000
 *                  isAdmin: false
 */

/**
 * @swagger
 * /transaction/all:
 *   get:
 *     summary: Returns the list of all the transactions
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: The list all transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/User'
 *               example:
 *                 id: 1
 *                 amount: "2000.00"
 *                 date: "2022-04-22T08:34:23.000Z"
 *                 sender_name: "Bowler Admin"
 *                 sender_number: "2341SDER124"
 *                 sender_email: "admin@admin.com"
 *                 receiver_name: "Bowler Admin"
 *                 receiver_number: "2341SDER124"
 *                 receiver_email: "admin@admin.com"
 *                 transaction_type: "deposit"
 */
