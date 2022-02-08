# UTC and UNIX time

### UTC (Coordinated Universal Time)

Primary time standard by which the world regulates clocks and time. It is within about 1 second of mean solar time at 0 longitude and is not adjusted to daylight savings time.


### Unix Time

Also known as Epoch/Posix time in the wild, the UNIX time is the number of seconds that have elapsed since the *UNIX EPOC* which is 00:00:00 UTC on 1 January 1970 (an arbitrary date). Unix time is nonlinear with a leap second having the same Unix time as the second before it (or after it, implementation dependent), so that every day is treated as if it contains exactly 86400 seconds, with no seconds added to or subtracted from the day as a result of positive or negative leap seconds. Due to this treatment of leap seconds, Unix time is not a true representation of UTC.

Unix time is widely used in operating systems and file formats. In Unix-like operating systems, date is a command which will print or set the current time; by default, it prints or sets the time in the system time zone, but with the -u flag, it prints or sets the time in UTC and, with the TZ environment variable set to refer to a particular time zone, prints or sets the time in that time zone.

### DIFFERENCES

Obviously from the statements above, both are COMPLETELY DIFFERENT, as UTC is a Time Zone Format while UNIX is a measure of time in seconds that have spanned since an initial dateTime. So basically, you could get all sorts of dates from a single unix time, depending on what system you have, what time zone you select, what method you use, etc!

IMPORTANT: a single unix time obviously has several different time zone dates (i.e. 16893372300000 can be Jan 8th 11pm and Jan 9th 8am in different time zones!)