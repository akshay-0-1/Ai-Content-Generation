/**
 * @typedef {Object} User
 * @property {string} id - User ID
 * @property {string} username - Username
 * @property {string} email - Email address
 */

/**
 * @typedef {Object} AuthState
 * @property {User|null} user - Current user or null if not authenticated
 * @property {boolean} isAuthenticated - Whether the user is authenticated
 * @property {boolean} isLoading - Whether authentication is in progress
 */

/**
 * @typedef {'success'|'error'|'info'|'warning'} ToastType
 */

/**
 * @typedef {Object} Toast
 * @property {string} id - Toast ID
 * @property {string} message - Toast message
 * @property {ToastType} type - Toast type
 */

/**
 * @typedef {'professional'|'marketing'|'social'|'educational'} ContentCategory
 */

/**
 * @typedef {Object} ContentType
 * @property {string} id - Content type ID
 * @property {string} name - Content type name
 * @property {ContentCategory} category - Content category
 * @property {string} description - Content type description
 */

/**
 * @typedef {Object} GeneratedContent
 * @property {string} id - Generated content ID
 * @property {string} title - Content title
 * @property {string} content - Generated content text
 * @property {ContentType} contentType - Type of content
 * @property {string} createdAt - Creation timestamp
 * @property {string} prompt - Original prompt used to generate content
 */

// Export empty object since JSDoc comments are used for types
export default {};
