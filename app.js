const { createApp } = Vue;

createApp({
  data() {
    return {
      sortAttribute: 'subject',
      sortOrder: 'ascending',
      showCart: false,
      name: '',
      phone: '',
      email: '', // Added email for checkout
      nameError: '',
      phoneError: '',
      emailError: '', // Added email error handling
      orderSubmitted: false,
      searchQuery: '',
      lessons: [
        { id: 1, subject: 'Project management', location: 'Sheffield', price: 800, spaces: 5, icon: 'images/icons/engineering.gif', rating: 4 },
        { id: 2, subject: 'Design engineering', location: 'London', price: 690, spaces: 5, icon: 'images/icons/project.gif', rating: 5 },
        { id: 3, subject: 'Chemistry', location: 'Liverpool', price: 550, spaces: 5, icon: 'images/icons/chemistry.gif', rating: 3 },
        { id: 4, subject: 'Medical Science', location: 'Birmingham', price: 990, spaces: 5, icon: 'images/icons/biology.gif', rating: 4.5 },
        { id: 5, subject: 'Psychology', location: 'Oxford', price: 880, spaces: 5, icon: 'images/icons/psychology.gif', rating: 4 },
        { id: 6, subject: 'Journalism', location: 'Manchester', price: 285, spaces: 5, icon: 'images/icons/journalism.gif', rating: 3.5 },
        { id: 7, subject: 'Geography', location: 'Derby', price: 395, spaces: 5, icon: 'images/icons/geography.gif', rating: 4 },
        { id: 8, subject: 'Art and Design', location: 'Preston', price: 470, spaces: 5, icon: 'images/icons/art.gif', rating: 5 },
        { id: 9, subject: 'Creative media', location: 'Portsmouth', price: 575, spaces: 5, icon: 'images/icons/media.gif', rating: 4.5 },
        { id: 10, subject: 'Computer Science', location: 'Bristol', price: 930, spaces: 5, icon: 'images/icons/computer_science.gif', rating: 5 }
      ],
      cart: []
    };
  },
  computed: {
    sortedLessons() {
      return this.lessons.slice().sort((a, b) => {
        let modifier = this.sortOrder === 'ascending' ? 1 : -1;
        let valueA = a[this.sortAttribute];
        let valueB = b[this.sortAttribute];

        if (this.sortAttribute === 'subject' || this.sortAttribute === 'location') {
          valueA = valueA.toLowerCase();
          valueB = valueB.toLowerCase();
          return (valueA < valueB ? -1 : valueA > valueB ? 1 : 0) * modifier;
        } else {
          return (valueA - valueB) * modifier;
        }
      });
    },
    filteredLessons() {
      return this.sortedLessons.filter(lesson =>
        lesson.subject.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        lesson.location.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    cartCount() {
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    },
    totalQuantity() {
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    },
    isFormValid() {
      return this.nameValid && this.phoneValid && this.emailValid;
    },
    nameValid() {
      return /^[a-zA-Z\s]+$/.test(this.name);
    },
    phoneValid() {
      return /^[0-9]+$/.test(this.phone);
    },
    emailValid() {
      return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(this.email);
    },
    allProductsAdded() {
      return this.lessons.every(lesson => lesson.spaces === 0);
    },
    cartTotalCost() {
      return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
  },
  watch: {
    name(value) {
      this.nameError = !this.nameValid && value ? 'Name must contain letters only.' : '';
    },
    phone(value) {
      this.phoneError = !this.phoneValid && value ? 'Phone must contain numbers only.' : '';
    },
    email(value) {
      this.emailError = !this.emailValid && value ? 'Email is not valid.' : '';
    }
  },
  methods: {
    addToCart(lesson) {
      if (lesson.spaces > 0) {
        lesson.spaces--;

        let cartItem = this.cart.find(item => item.id === lesson.id);
        if (cartItem) {
          cartItem.quantity++;
        } else {
          this.cart.push({
            id: lesson.id,
            subject: lesson.subject,
            price: lesson.price,
            quantity: 1
          });
        }
      }
    },
    removeFromCart(item) {
      let lesson = this.lessons.find(lesson => lesson.id === item.id);
      if (lesson) {
        lesson.spaces += item.quantity; // Restore spaces
      }
      this.cart = this.cart.filter(cartItem => cartItem.id !== item.id);
    },
    toggleCart() {
      this.showCart = !this.showCart;
      if (!this.showCart) {
        this.orderSubmitted = false;
      }
    },
    checkout() {
      if (this.isFormValid) {
        alert("Thank you for your bookings!"); // Show alert on successful checkout
        this.orderSubmitted = true;
        this.cart = [];
        this.name = '';
        this.phone = '';
        this.email = '';
        this.showCart = false;
      }
    },
    getStarClass(n, rating) {
      if (n <= Math.floor(rating)) {
        return 'fas fa-star'; // Solid star
      } else if (n - 0.5 === rating) {
        return 'fas fa-star-half-alt'; // Half star
      } else {
        return 'far fa-star'; // Empty star
      }
    },
    goHome() {
      window.location.href = 'index.html'; // Replace with your index page path
    }
  }
}).mount('#app');
