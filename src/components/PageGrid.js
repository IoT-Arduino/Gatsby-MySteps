import React from "react"

import Grid from "@material-ui/core/Grid"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

const PageGrid = ({ grids }) => {
  return (
    <Grid item xs={12} sm={6} md={4} style={{ padding: 24 }}>
      <Card>
        <CardMedia
          style={{ height: 0, paddingTop: "56.25%" }}
          image={grids.node.data.Thumbnail}
          title={grids.node.data.Title}
        />

        <CardContent>
          <Typography
            gutterBottom
            variant="inherit"
            component="h3"
            style={{ height: 40, overflow: "hidden", fontSize: "18px" }}
          >
            {grids.node.data.Title}
          </Typography>
          <Typography component="p" style={{ marginBottom: "10px" }}>
            "{grids.node.data.Description.substr(0, 100)} ..."
          </Typography>
          <Typography component="p">{grids.node.data.Channel}</Typography>
          <Typography component="p">{grids.node.data.category}</Typography>
          <Typography component="p">{grids.node.data.PublishedDate}</Typography>
        </CardContent>

        <CardActions>
          <Button
            size="small"
            color="primary"
            href={grids.node.data.VideoURL}
            target="_blank"
          >
            Go to Course
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default PageGrid
