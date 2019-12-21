var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/iven');


var studentSchema = mongoose.Schema({
	studentID: String,
	studentFname: String,
	studentLname: String,
	studentTel: String,
	studentEmail: String,
	studentPassword: String,
	studentBirthday: Number,
	studentMonthbirthday: Number,
	studentYearbirthday: Number,
	studentWeight: Number,
	studentHeight: Number
});
var Student = mongoose.model("student", studentSchema);

router.post('/add', function (req, res) {

	var studentID = req.body.studentID;
	var studentFname = req.body.studentFname;
	var studentLname = req.body.studentLname;
	var studentTel = req.body.studentTel;
	var studentEmail = req.body.studentEmail;
	var studentPassword = req.body.studentPassword;
	var studentBirthday = req.body.studentBirthday;
	var studentMonthbirthday = req.body.studentMonthbirthday;
	var studentYearbirthday = req.body.studentYearbirthday;
	var studentWeight = req.body.studentWeight;
	var studentHeight = req.body.studentHeight;

	var newStudent = new Student({
		studentID: studentID,
		studentFname: studentFname,
		studentLname: studentLname,
		studentTel: studentTel,
		studentEmail: studentEmail,
		studentPassword: studentPassword,
		studentBirthday: studentBirthday,
		studentMonthbirthday: studentMonthbirthday,
		studentYearbirthday: studentYearbirthday,
		studentWeight: studentWeight,
		studentHeight: studentHeight,

	});

	newStudent.save(function (err) {
		if (err) {
			res.json({ result: '0' });
		} else {
			res.json({ result: '1' });
		}
	});
});

router.get('/list', function (req, res) { //ไว้ดูข้อมูล
	Student.find(function (err, response) {
		res.json({ data: response, response: response.length });
	});
});

router.get('/search/id/:studentID', function (req, res) { // ค้นหา ID
	var stdID = req.params.studentID;
	Student.find({ studentID: stdID }, function (err, response) {
		res.send({ data: response, result: response.length });
	});
}),


	router.post('/search/partname', function (req, res) { // ค้นหา ชื่อ
		var fStudentName = req.body.studentFname;
		var searchpattrn = new RegExp(fStudentName, 'i');
		Student.find({ studentFname: { $regex: searchpattrn } }, function (err, response) {
			res.json({ data: response, result: response.length });
		});
	}),


	router.post('/search/weight', function (req, res) { //ค้นหาน้ำนัก gt = มากกว่า, gte มากว่าเท่ากับ, lt=น้อยกว่า , lte = น้อยกว่าเท่ากับ
		var fStudentWight = req.body.weight;
		Student.find({ studentWeight: { $gt: fStudentWight } }, function (err, response) {
			res.json({ data: response, result: response.length });
		});
	}),



	router.get('/delID/id/:studentID', function (req, res) { // ลบ ID
		var fstudentID = req.params.studentID;
		Student.remove({ studentID: fstudentID }, function (err) {
			if (err) {
				res.json({ result: '0' });
			}
			else {
				res.json({ result: '1' });
			}
		});
	}),


	router.post('/update', function (req, res) { // อัพเดทข้อมูลทั้งหมด

		var studentID = req.body.studentID;
		var studentFname = req.body.studentFname;
		var studentLname = req.body.studentLname;
		var studentTel = req.body.studentTel;
		var studentEmail = req.body.studentEmail;
		var studentPassword = req.body.studentPassword;
		var studentBirthday = req.body.studentBirthday;
		var studentMonthbirthday = req.body.studentMonthbirthday;
		var studentYearbirthday = req.body.studentYearbirthday;
		var studentWeight = req.body.studentWeight;
		var studentHeight = req.body.studentHeight;

		var updateStudent = {
			studentID: studentID,
			studentFname: studentFname,
			studentLname: studentLname,
			studentTel: studentTel,
			studentEmail: studentEmail,
			studentPassword: studentPassword,
			studentBirthday: studentBirthday,
			studentMonthbirthday: studentMonthbirthday,
			studentYearbirthday: studentYearbirthday,
			studentWeight: studentWeight,
			studentHeight: studentHeight,
		};

		Student.update({ studentID: updateStudent.studentID }, updateStudent, function (err) {
			if (err) {
				res.json({ result: '0' });
			} else {
				res.json({ result: '1' });
			}
		});
	});




router.post('/changepassword', function (req, res) { // อัพเดท Password
	var studentID = req.body.studentID;
	var pas = req.body.studentPassword;

	Student.update({ studentID: studentID }, { $set: { studentPassword: pas } }, function (err) {
		if (err) {
			res.send('0');
		} else {
			res.send('1');
		}
	});
});

router.post('/login', function (req, res) {
	var studentEmail = req.body.studentEmail;
	var studentPassword = req.body.studentPassword;

	Student.find({ studentEmail: studentEmail, studentPassword: studentPassword}, function (err, response) {
		res.json({ data: response, result: response.length });
	});
	
});


router.get('/', function (req, res) {
	res.send('GET route on student.');
});


module.exports = router;