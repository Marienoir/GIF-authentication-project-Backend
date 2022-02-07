/* eslint-disable no-sequences */
/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
/* eslint-disable quote-props */
/* eslint-disable prefer-const */
/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable one-var-declaration-per-line */
/* eslint-disable one-var */
/* eslint-disable camelcase */
/* eslint-disable no-import-assign */
/* eslint-disable no-undef */
import * as uuid from 'uuid';
import db from '../src/db/index';
import app from '../src/index';

const { PreparedStatement: PS } = require('pg-promise');

const { expect } = require('chai');
const request = require('supertest');

let admin_token, user_token, user_refresh_token, userId, user_first_name, purchase_id, item;
let userEmail = `richard.${uuid.v1()}@mail.com`;
let email = 'mike.scofield@gmail.com';
let password = 'abcd1@';

// describe('', () => {
//   before(async () => {
//     const addAdminRole = new PS({ name: 'seed-role', text: 'INSERT INTO roles(role_code, role_name) VALUES($1, $2), ($3, $4)' });
//     db.none(addAdminRole, ['ADM', 'ADMIN', 'SUP', 'SUPERVISOR']);

//     const addApprovalStatus = new PS({ name: 'seed-approval', text: 'CREATE TYPE approval_status AS ENUM ($1, $2, $3,)' });
//     db.none(addApprovalStatus, ['pending', 'approved', 'disapproved']);

//     const addSchedule = new PS({ name: 'add-schedule', text: 'ALTER TABLE users ADD schedule timestamp' });
//     db.none(addSchedule);
//   });

  describe('base url', () => {
    it('baseurl', (done) => {
      request(app)
        .get('/')
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).to.equal('Welcome to GIF');
          expect(res.body.status).to.equal('Success');
          expect(res.body.code).to.equal(200);
          done();
        });
    });
  });

  describe('User Registration', () => {
    it('should register a user', (done) => {
      request(app)
        .post('/api/v1/register')
        .send({
          name: 'Michael',
          email: email,
          phone_number: '09028430564',
          password: password,
          confirm_password: password
        })
        .expect(201)
        .end((err, res) => {
          expect(res.body.message).to.equal('User created successfully');
          expect(res.body.code).to.equal(201);
          expect(res.body.data).to.be.an('object');
          done();
        });
    });
  });

  describe('User Login', () => {
    it('should login a user', (done) => {
      request(app)
        .post('/api/v1/login')
        .send({
          email: email,
          password: password,
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).to.equal('Login successful');
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('Admin Login', () => {
    it('should login an admin', (done) => {
      request(app)
        .post('/api/v1/login')
        .send({
          email: 'timileyin@enyata.com',
          password: 'abcd1@',
        })
        .expect(200)
        .end((err, res) => {
          admin_token = res.body.token;
          expect(res.body.message).to.equal('Login successful');
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('Get Users', () => {
    it('should return all users', (done) => {
      request(app)
        .get('/api/v1/users')
        .set('x-access-token', `${admin_token}`)
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
