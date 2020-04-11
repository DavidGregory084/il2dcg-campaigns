File
  = entries:Entries* Whitespace { return [...entries]; }

Entries
  = Whitespace entry:Entry { return entry; }

Entry
  = header:Header waypoints:Waypoints* {
    return { ...header, waypoints };
  }

Header
  = "[" from:Location " to " to:Location "]" { return { from, to }; }

Location
  = location:[-a-zA-Z0-9_.&]+ { return location.join(""); }

Waypoints
 = Whitespace waypoint:Waypoint { return waypoint };

Waypoint
 = number:Number numbers:Numbers* { return [number, ...numbers]; }

Numbers
  = [ ] number: Number { return number; }

Number
  = negative:Negative? digits:Digits decimals:DecimalDigits? {
    const withSign = negative ? "-" + digits : digits;
    const withDecimals = withSign + "." + decimals;
    return decimals ? withDecimals : withSign;
  }

Negative
 = "-"

Digits
  = digits:[0-9]+ { return digits.join(""); }

DecimalDigits
  = "." digits:Digits { return digits };

Whitespace
  = [ \t\n\r]*
