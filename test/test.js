'use strict';

var litmusStream = require('../index');
var Litmus = require('../lib/litmus');
var expect = require('chai').expect;
var fs = require('fs');


describe('litmusStream', function(){

	it('should fail if no options are passed', function(){
		expect(function(){ litmus() }).to.throw(Error);
	});

});



describe('Litmus', function(){
	
	var litmus;

	beforeEach(function(){
		litmus = new Litmus({});
	});


	describe('#getAvgTime', function(){
		it('should get average time for a test to complete', function(){

			var seconds = '<average_time_to_process>10</average_time_to_process>';
	    var minutes = '<average_time_to_process>120</average_time_to_process>';

	    expect(litmus.getAvgTime(seconds)).to.eql('10 secs');
	    expect(litmus.getAvgTime(minutes)).to.eql('2 mins');

		});
	});



	describe('#getStatus', function(){
		it('should return object with delayed or unavailable clients', function(){
			var xml = ['<parent>',
                  '<status>1</status>',
                  '<application_long_name>Outlook</application_long_name>',
	              '</parent>',
	              '<parent>',
	                '<application_long_name>Gmail</application_long_name>',
	                '<status>2</status>',
	              '</parent>'].join('');

			expect(litmus.getStatus(xml)).to.eql({ delayed: 'Outlook', unavailable: 'Gmail' });
		});
	});



	describe('#getBuiltXml', function(){
		it('should return built xml for response', function() {
		
			var html = '<p></p>';
			var expected = fs.readFileSync(__dirname + '/fixtures/testXML.xml', 'utf8');

			expect(litmus.getBuiltXml(html, 'Test XML')).to.eql(expected);
			
		});
	});



	describe('#getId', function(){
		it('should return a map that contains the id for a test', function(){

			var response = ['response object', '<parent><name>Title</name><id>10</id></parent>'];
	    litmus.title = 'Title';

			expect(litmus.getId(response)).to.eql({ id: '10' });

		});
	});
	

});
