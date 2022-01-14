'use strict'
const { Sequelize } = require('sequelize')
const Users = require('../sequelize/models').Users
const Profiles = require('../sequelize/models').Profiles
const Grades = require('../sequelize/models/').Grades

module.exports = {
  async createGrade (req, res) {
    const token = req.headers.authorization
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString().split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
    const actor = JSON.parse(jsonPayload).user.username
    const teacher = await Profiles.findOne({ where: { id: req.payload.teacher_id }, raw: true })
    const toCreate = await Users.findOne({ where: { id: teacher.user_id }, raw: true })
    const student = await Profiles.findOne({ where: { id: req.payload.student_id }, raw: true })
    if (actor === toCreate.username && student.faculty == teacher.faculty && student.university == teacher.university && teacher.group == null) {
      let grade
      grade = await Grades.create({
        id: req.payload.id,
        student_id: req.payload.student_id,
        teacher_id: req.payload.teacher_id,
        grade: req.payload.grade,
        lesson: req.payload.lesson
      })
      return res.response(grade).code(200)
    } else {
      return { error: 'Teacher and student faculty and university must be the same' }
    }
  },

  async getAllGrades (req, res) {
    const result = await Grades.findAll()
    return result
  },
  async getAverageByStudent (req, res) {
    const token = req.headers.authorization
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString().split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
    const actor = JSON.parse(jsonPayload).user.username
    const from = await Users.findOne({ where: { username: actor }, raw: true })
    const fromProfile = await Profiles.findOne({ where: { user_id: from.id }, raw: true })
    const student = await Profiles.findOne({ where: { id: req.params.id }, raw: true })
    if ((fromProfile.group == null && fromProfile.university == student.university && fromProfile.faculty == student.faculty) ||
        (fromProfile.group != null && fromProfile.user_id == student.user_id)) {
      const result = await Grades.findAll({
        where: { student_id: req.params.id },
        attributes: [[Sequelize.fn('avg', Sequelize.col('grade')), 'avgGrade']]
      })
      return result
    } else {
      return { error: 'Teacher and student faculty and university must be the same / students can get only their own grades' }
    }
  },
  async getAverageByFaculty (req, res) {
    const token = req.headers.authorization
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString().split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
    const actor = JSON.parse(jsonPayload).user.username
    const from = await Users.findOne({ where: { username: actor }, raw: true })
    const fromProfile = await Profiles.findOne({ where: { user_id: from.id }, raw: true })
    if (fromProfile.group == null && fromProfile.faculty == req.params.faculty) {
      const students = await Profiles.findAll({ where: { faculty: req.params.faculty }, raw: true })
      const idList = []
      students.forEach(element => {
        idList.push(element.id)
      })
      const result = await Grades.findAll({
        where: { student_id: idList },
        attributes: [[Sequelize.fn('avg', Sequelize.col('grade')), 'avgGrade']]
      })
      return result
    } else {
      return { error: 'Teacher faculty and specified faculty must be the same' }
    }
  },
  async getAverageByGroup (req, res) {
    const token = req.headers.authorization
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString().split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
    const actor = JSON.parse(jsonPayload).user.username
    const from = await Users.findOne({ where: { username: actor }, raw: true })
    const fromProfile = await Profiles.findOne({ where: { user_id: from.id }, raw: true })
    const checkProfile = await Profiles.findOne({ where: { group: req.params.group }, raw: true })
    if (fromProfile.group == null && checkProfile.faculty == fromProfile.faculty && checkProfile.university == fromProfile.university) {
      const students = await Profiles.findAll({ where: { group: req.params.group }, raw: true })
      const idList = []
      students.forEach(element => {
        idList.push(element.id)
      })
      const result = await Grades.findAll({
        where: { student_id: idList },
        attributes: [[Sequelize.fn('avg', Sequelize.col('grade')), 'avgGrade']]
      })
      return result
    } else {
      return { error: 'Teacher faculty+university and specified group faculty+university must be the same' }
    }
  },
  async getAverageByLesson (req, res) {
    const token = req.headers.authorization
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString().split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
    const actor = JSON.parse(jsonPayload).user.username
    const from = await Users.findOne({ where: { username: actor }, raw: true })
    const fromProfile = await Profiles.findOne({ where: { user_id: from.id }, raw: true })
    if (fromProfile.group != null) {
      const result = await Grades.findAll({
        where: { lesson: req.params.lesson, student_id: fromProfile.id },
        attributes: [[Sequelize.fn('avg', Sequelize.col('grade')), 'avgGrade']]
      })
      return result
    } else {
      return { error: 'Only for students' }
    }
  },
  async getGradesList (req, res) {
    const token = req.headers.authorization
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString().split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
    const actor = JSON.parse(jsonPayload).user.username
    const from = await Users.findOne({ where: { username: actor }, raw: true })
    const fromProfile = await Profiles.findOne({ where: { user_id: from.id }, raw: true })
    if (fromProfile.group != null) {
      const result = await Grades.findAll({ where: { lesson: req.params.lesson, student_id: fromProfile.id } })
      return result
    } else {
      return { error: 'Only for students' }
    }
  },
  async deleteGrade (req, res) {
    return await Grades.destroy({
      where: {
        id: req.params.id
      }
    }).then((affectedRows) => {
      console.log(affectedRows + 'rows affected')
      return Grades.findAll()
    })
  },
  async updateGrade (req, res) {
    const token = req.headers.authorization
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString().split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
    const actor = JSON.parse(jsonPayload).user.username
    const grade = await Grades.findOne({ where: { id: req.params.id }, raw: true })
    const profile = await Profiles.findOne({ where: { user_id: grade.teacher_id }, raw: true })
    const toEdit = await Users.findOne({ where: { id: profile.user_id }, raw: true })
    if (actor === toEdit.username && profile.group == null) {
      req.payload = JSON.parse(JSON.stringify(req.payload))
      // converting payload to json
      return await Grades.update(
        {
          grade: req.payload.grade
        },
        {
          where:
                        { id: req.params.id }
        }
      ).then((affectedRows) => {
        console.log(affectedRows + ' rows affected')
        return Grades.findAll()
      })
    } else {
      return { error: 'You must be a teacher and/or you cant edit other teacher grades.' }
    }
  }
}
