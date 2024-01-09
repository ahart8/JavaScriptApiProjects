SELECT c.CustomerDisplayID,c.CustomerID, a.AccountID,a.AccountType,a.FirstName,a.LastName,Count(ct.ContactID),ct.NameFirst,ct.NameLast,pa.ProspectApplicationID,a.CreateUserID,a.CreateDate
FROM accounts a
LEFT JOIN prospectapplications pa ON a.AccountID=pa.AccountID
LEFT JOIN customers c ON a.AccountID=c.CustomerID
LEFT JOIN contacts ct ON a.AccountID=ct.EntityKeyID
LEFT JOIN charges ch ON a.AccountID=ch.AccountID
LEFT JOIN payments p ON a.AccountID=p.AccountID

WHERE 
	(	a.LastName IN('/','.','N/A','sex','?') 
		OR a.FirstName IN('/','.','N/A','sex','?')
 
	   OR	a.lastName  LIKE "%dating%"
		OR a.firstName LIKE "%dating%" 
		OR a.lastName  LIKE "%http%" 
		OR a.firstName LIKE "%http%" 
		OR a.lastName  LIKE "%www%" 
		OR a.firstName LIKE "%www%" 
		OR a.lastName  LIKE "%.com%"
		OR a.firstName LIKE "%.com%" 
		OR a.firstName LIKE "%meet %" 
		OR a.lastName  LIKE "%meet %" 
		OR a.firstName LIKE "%adult%" 
	   AND a.lastName  LIKE "%adult%" ) 
		AND ch.ChargeID IS NULL
		ANd p.PaymentID IS NULL 
		AND pa.ProspectApplicationID IS NULL
		GROUP BY a.AccountID
		HAVING COUNT(ct.ContactID)=1;
    ;