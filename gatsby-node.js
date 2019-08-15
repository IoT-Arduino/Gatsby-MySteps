const path = require('path');
const slash = require('slash');
const { paginate } = require('gatsby-awesome-pagination');
// const _ = require('lodash')



module.exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    const blogPostTemplate = path.resolve(`./src/templates/blog.js`)
    const postListTemplate = path.resolve('./src/templates/post-list.js');
    const postListCatTemplate = path.resolve('./src/templates/post-list-cat.js');

    const res = await graphql(`
    query{
      
      allContentfulBlogPost{
        edges{
          node{
            id
            slug
            publishedDate(fromNow:true)
            catetory{
              catTitle
              id
              catSlug
            }
            excerpt
          }
        }
      }
    allContentfulCategory{
     totalCount
      edges{
       node{
        id
        catTitle
        catSlug
      }
      }
      }
    }

    `);


  // Check for errors
  if (res.errors) {
    throw new Error(res.errors);
  }

    const {
      allContentfulCategory,
      allContentfulBlogPost,
    } = res.data;

    // create archive pages for each category
    allContentfulCategory.edges.forEach(catEdge =>{
      // filter out the posts that belongs tot the current category
      const filteredPosts = allContentfulBlogPost.edges.filter(
        el =>
        el.node.catetory.catSlug === catEdge.node.catSlug        
        // ({ node: { catetory } }) => 
        //   catetory.some(el => el.catSlug === catEdge.node.catSlug)
      );

      if(filteredPosts.length>0) {        
        paginate({
          createPage,
          items:filteredPosts,
          itemsPerPage:3,
          component: postListCatTemplate,
          pathPrefix:`/blog/${catEdge.node.catSlug}`,
          context:{
            catId: catEdge.node.id,
            catName: catEdge.node.Title,
            catSlug: catEdge.node.catSlug,
            catCount: catEdge.node.count,
            categories: allContentfulCategory.edges,
          }
        })
      }
    });


    //  end create archive pages for each category

    allContentfulBlogPost.edges.forEach(edge => {

      // Basic Blog Post Creation

        createPage({
          path:`/blog/${edge.node.slug}`,
          component: blogPostTemplate,
          context: {
            slug: edge.node.slug,
            // Can not pass context to the blogSingle Page now
            // relatedArticles:getRelatedArticles(edge.node, allContentfulBlogPost.edges),
          },
        });

        
      //blog pagination start

      const posts = allContentfulBlogPost.edges
      const pathPrefix = ({ pageNumber }) =>
            pageNumber === 0 ? '/blogs' : '/blog/page'

        paginate({
          createPage,
          items:posts,
          itemsPerPage:5,
          component: postListTemplate,
          // pathPrefix:`/blog`,
          pathPrefix:pathPrefix
          // context:{
          //   catId: posts.node.id,
          //   catName: posts.node.Title,
          //   catSlug: posts.node.catSlug,
          //   catCount: posts.node.count,
          //   categories: allContentfulCategory.edges,
          // }
        })


      //blog pagination end 

    });


  };


