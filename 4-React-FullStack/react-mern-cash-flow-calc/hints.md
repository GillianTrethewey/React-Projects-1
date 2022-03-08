
Challenge #3: HINT
-----------------------------------------------------------------

- Hint 1:

      const fetchOptions = {
        method: SOMETHING_GOES_HERE,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({}),
      };
      fetch('/api/mongodb/cashflow/', fetchOptions)
        .then(response => response.json())
        .then(data => {
          console.log('Data received:', data);
          // Hint: How do we retrieve the hex from here so we can redirect?

        })



- Hint 2:

      const fetchOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({}),
      };
      fetch('/api/mongodb/cashflow/', fetchOptions)
        .then(response => response.json())
        .then(data => {
          console.log('Data received:', data);
          const hex = data.results.ops[0].hex;
          props.history.push('/chart/' + hex);
        })



Challenge #4: HINT
-----------------------------------------------------------------


- HINT 1:

      const fetchOptions = {
        method: SOMETHING_GOES_HERE,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(SOMETHING_ELSE_GOES_HERE),
      };
      const url = '/api/mongodb/cashflow/?hex=' + hex;
      fetch(url, fetchOptions)
        .then(response => response.json())
        .then(data => {
          console.log('Save successful', data);
        })


- HINT 2:

      const fetchOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      };
      const url = '/api/mongodb/cashflow/?hex=' + hex;
      fetch(url, fetchOptions)
        .then(response => response.json())
        .then(data => {
          console.log('Save successful', data);
        })




Challenge #5: HINT
-----------------------------------------------------------------

- HINT 1:

      const url = `${ENDPOINT}?hex=${hex}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log('Got data back', data);
        })



- HINT 2:

      const url = `${ENDPOINT}?hex=${hex}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log('Got data back', data);
          setData({
            ...getDefault(), // add in default values
            ...data[0], // add in data from API
          });
        })



Bonus Challenge: HINT
-----------------------------------------------------------------

- Importing notify:

      import { notify } from 'react-notify-toast';

- Using catch + notify:

      fetch(url, fetchOptions)
        .then(response => response.json())
        .then(data => {
          console.log('Success!', data);
          // ...
        })
        .catch(err => {
          // If the request fails, notify the user that it couldn't save
          notify.show('Could not connect to server. Check your connection?');
        });







- Extra bonuses:

      // isCreating is used to prevent accidental "double clicks"
      const [isCreating, setIsCreating] = useState(false);

      if (isCreating) {
        return; // Already clicked, prevent double click
      }

