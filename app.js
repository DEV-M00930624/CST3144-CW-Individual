const { createApp } = Vue;

createApp({
  data() {
    return {
      sortAttribute: 'subject',
      sortOrder: 'ascending',
      showCart: false,
      name: '',
      phone: '',
      nameError: '',
      phoneError: '',
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
          if (valueA < valueB) return -1 * modifier;
          if (valueA > valueB) return 1 * modifier;
          return 0;
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
      return this.cart.length;
    },
    totalQuantity() {
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    },
    isFormValid() {
      return this.nameValid && this.phoneValid;
    },
    nameValid() {
      return /^[a-zA-Z\s]+$/.test(this.name);
    },
    phoneValid() {
      return /^[0-9]+$/.test(this.phone);
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
      if (!this.nameValid && value) {
        this.nameError = 'Name must contain letters only.';
      } else {
        this.nameError = '';
      }
    },
    phone(value) {
      if (!this.phoneValid && value) {
        this.phoneError = 'Phone must contain numbers only.';
      } else {
        this.phoneError = '';
      }
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
        lesson.spaces += item.quantity;
      }
      let index = this.cart.indexOf(item);
      if (index > -1) {
        this.cart.splice(index, 1);
      }
    },
    toggleCart() {
      this.showCart = !this.showCart;
      if (!this.showCart) {
        this.orderSubmitted = false;
      }
    },
    checkout() {
      if (this.isFormValid) {
        this.orderSubmitted = true;
        this.cart = [];
        this.name = '';
        this.phone = '';
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
