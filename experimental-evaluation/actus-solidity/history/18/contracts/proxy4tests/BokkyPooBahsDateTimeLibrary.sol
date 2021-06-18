pragma experimental ABIEncoderV2;
import "../external/BokkyPooBah/BokkyPooBahsDateTimeLibrary.sol";

contract ProxyBokkyPooBahsDateTimeLibrary  {

      using BokkyPooBahsDateTimeLibrary for uint;

   function test_daysFromDate(uint  year, uint  month, uint  day) public pure returns (uint ){
    return year._daysFromDate(month,day);
   }

   function test_daysToDate(uint  _days) public pure returns (uint , uint , uint ){
    return _days._daysToDate();
   }

   function testtimestampFromDate(uint  year, uint  month, uint  day) public pure returns (uint ){
    return year.timestampFromDate(month,day);
   }

   function testtimestampFromDateTime(uint  year, uint  month, uint  day, uint  hour, uint  minute, uint  second) public pure returns (uint ){
    return year.timestampFromDateTime(month,day,hour,minute,second);
   }

   function testtimestampToDate(uint  timestamp) public pure returns (uint , uint , uint ){
    return timestamp.timestampToDate();
   }

   function testtimestampToDateTime(uint  timestamp) public pure returns (uint , uint , uint , uint , uint , uint ){
    return timestamp.timestampToDateTime();
   }

   function testisValidDate(uint  year, uint  month, uint  day) public pure returns (bool ){
    return year.isValidDate(month,day);
   }

   function testisValidDateTime(uint  year, uint  month, uint  day, uint  hour, uint  minute, uint  second) public pure returns (bool ){
    return year.isValidDateTime(month,day,hour,minute,second);
   }

   function testisLeapYear(uint  timestamp) public pure returns (bool ){
    return timestamp.isLeapYear();
   }

   function test_isLeapYear(uint  year) public pure returns (bool ){
    return year._isLeapYear();
   }

   function testisWeekDay(uint  timestamp) public pure returns (bool ){
    return timestamp.isWeekDay();
   }

   function testisWeekEnd(uint  timestamp) public pure returns (bool ){
    return timestamp.isWeekEnd();
   }

   function testgetDaysInMonth(uint  timestamp) public pure returns (uint ){
    return timestamp.getDaysInMonth();
   }

   function test_getDaysInMonth(uint  year, uint  month) public pure returns (uint ){
    return year._getDaysInMonth(month);
   }

   function testgetDayOfWeek(uint  timestamp) public pure returns (uint ){
    return timestamp.getDayOfWeek();
   }

   function testgetYear(uint  timestamp) public pure returns (uint ){
    return timestamp.getYear();
   }

   function testgetMonth(uint  timestamp) public pure returns (uint ){
    return timestamp.getMonth();
   }

   function testgetDay(uint  timestamp) public pure returns (uint ){
    return timestamp.getDay();
   }

   function testgetHour(uint  timestamp) public pure returns (uint ){
    return timestamp.getHour();
   }

   function testgetMinute(uint  timestamp) public pure returns (uint ){
    return timestamp.getMinute();
   }

   function testgetSecond(uint  timestamp) public pure returns (uint ){
    return timestamp.getSecond();
   }

   function testaddYears(uint  timestamp, uint  _years) public pure returns (uint ){
    return timestamp.addYears(_years);
   }

   function testaddMonths(uint  timestamp, uint  _months) public pure returns (uint ){
    return timestamp.addMonths(_months);
   }

   function testaddDays(uint  timestamp, uint  _days) public pure returns (uint ){
    return timestamp.addDays(_days);
   }

   function testaddHours(uint  timestamp, uint  _hours) public pure returns (uint ){
    return timestamp.addHours(_hours);
   }

   function testaddMinutes(uint  timestamp, uint  _minutes) public pure returns (uint ){
    return timestamp.addMinutes(_minutes);
   }

   function testaddSeconds(uint  timestamp, uint  _seconds) public pure returns (uint ){
    return timestamp.addSeconds(_seconds);
   }

   function testsubYears(uint  timestamp, uint  _years) public pure returns (uint ){
    return timestamp.subYears(_years);
   }

   function testsubMonths(uint  timestamp, uint  _months) public pure returns (uint ){
    return timestamp.subMonths(_months);
   }

   function testsubDays(uint  timestamp, uint  _days) public pure returns (uint ){
    return timestamp.subDays(_days);
   }

   function testsubHours(uint  timestamp, uint  _hours) public pure returns (uint ){
    return timestamp.subHours(_hours);
   }

   function testsubMinutes(uint  timestamp, uint  _minutes) public pure returns (uint ){
    return timestamp.subMinutes(_minutes);
   }

   function testsubSeconds(uint  timestamp, uint  _seconds) public pure returns (uint ){
    return timestamp.subSeconds(_seconds);
   }

   function testdiffYears(uint  fromTimestamp, uint  toTimestamp) public pure returns (uint ){
    return fromTimestamp.diffYears(toTimestamp);
   }

   function testdiffMonths(uint  fromTimestamp, uint  toTimestamp) public pure returns (uint ){
    return fromTimestamp.diffMonths(toTimestamp);
   }

   function testdiffDays(uint  fromTimestamp, uint  toTimestamp) public pure returns (uint ){
    return fromTimestamp.diffDays(toTimestamp);
   }

   function testdiffHours(uint  fromTimestamp, uint  toTimestamp) public pure returns (uint ){
    return fromTimestamp.diffHours(toTimestamp);
   }

   function testdiffMinutes(uint  fromTimestamp, uint  toTimestamp) public pure returns (uint ){
    return fromTimestamp.diffMinutes(toTimestamp);
   }

   function testdiffSeconds(uint  fromTimestamp, uint  toTimestamp) public pure returns (uint ){
    return fromTimestamp.diffSeconds(toTimestamp);
   }


}