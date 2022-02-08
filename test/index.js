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
import app from '../src/index';

const { PreparedStatement: PS } = require('pg-promise');

const { expect } = require('chai');
const request = require('supertest');

let admin_token;
let email = `richard.${uuid.v1()}@gmail.com`;
let admin_email = 'timileyin@enyata.com';
let password = 'abcd1@';

  describe('Base Route', () => {
    it('Base Route', (done) => {
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
          email: admin_email,
          password: password,
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

  describe('Forgot Password', () => {
    it('should initiate a reset code', (done) => {
      request(app)
        .post('/api/v1/forgot-password')
        .send({
          email: email,
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).to.equal('Reset password link sent successfully');
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
